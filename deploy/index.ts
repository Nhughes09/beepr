import * as pulumi from "@pulumi/pulumi";
import * as linode from "@pulumi/linode";
import * as k8s from "@pulumi/kubernetes";
import * as selfSignedCert from "@pulumi/tls-self-signed-cert";

const linodeProvider = new linode.Provider("linodeProvider", {
  token: process.env.LINODE_TOKEN,
});

const lkeCluster = new linode.LkeCluster(
  "cluster",
  {
    region: "us-east",
    k8sVersion: "1.30",
    label: "cluster",
    pools: [
      {
        type: 'g6-standard-1',
        count: 3,
      }
    ],
  },
  { provider: linodeProvider }
);

const namespaceName = "beep";
const appName = "api";

const k8sProvider = new k8s.Provider("k8sProvider", {
  kubeconfig: lkeCluster.kubeconfig.apply(x => Buffer.from(x, 'base64').toString()),
});

const namespace = new k8s.core.v1.Namespace(namespaceName, {
  metadata:
    {
      name: namespaceName,
      labels: { name: namespaceName }
    }
  },
  { provider: k8sProvider }
);

const deployment = new k8s.apps.v1.Deployment(
  appName,
  {
    metadata: {
      name: appName,
      namespace: namespace.metadata.name,
      labels: { app: appName }
    },
    spec: {
      selector: { matchLabels: { app: appName } },
      replicas: 3,
      template: {
        metadata: { labels: { app: appName } },
        spec: {
          containers: [
            {
              name: appName,
              image: "ghcr.io/bnussman/beep:main",
              imagePullPolicy: "Always",
              ports: [
                { containerPort: 3000 }
              ],
              envFrom: [
                { configMapRef: { name: appName }}
              ]
            }
          ]
        }
      }
    }
  },
  { provider: k8sProvider }
);

const config = new k8s.core.v1.ConfigMap(
  appName,
  {
    metadata: {
      name: appName,
      namespace: namespaceName,
    },
    data: process.env as Record<string, string>,
  },
  { provider: k8sProvider }
);

const cert = new selfSignedCert.SelfSignedCertificate("cert", {
  dnsName: "api.dev.ridebeep.app",
  validityPeriodHours: 807660,
  localValidityPeriodHours: 17520,
  subject: {
    commonName: "beep-api-cert",
    organization: "Ride Beep App",
  },
});

const secret = new k8s.core.v1.Secret(
  appName,
  {
    metadata: { name: "cert", namespace: namespace.metadata.name },
    type: "kubernetes.io/tls",
    stringData: {
      ['tls.crt']: cert.pem,
      ['tls.key']: cert.privateKey
    },
  },
  { provider: k8sProvider }
);

const service = new k8s.core.v1.Service(
  appName,
  {
    metadata: {
      name: appName,
      namespace: namespaceName,
      annotations: {
        ['service.beta.kubernetes.io/linode-loadbalancer-default-protocol']: 'https',
        ['service.beta.kubernetes.io/linode-loadbalancer-check-type']: 'connection',
        ['service.beta.kubernetes.io/linode-loadbalancer-port-443']: '{ "tls-secret-name": "cert", "protocol": "https" }'
      }
    },
    spec: {
      type: "LoadBalancer",
      ports: [{ port: 443, targetPort: 3000 }],
      selector: { app: appName }
    }
  },
  { provider: k8sProvider }
);

const redisDeployment = new k8s.apps.v1.Deployment(
  "redis",
  {
    metadata: {
      name: "redis",
      namespace: namespace.metadata.name,
      labels: { app: "redis" }
    },
    spec: {
      selector: { matchLabels: { app: "redis" } },
      replicas: 1,
      template: {
        metadata: { labels: { app: "redis" } },
        spec: {
          containers: [
            {
              name: "redis",
              image: "redis:latest",
              ports: [
                { containerPort: 6379 }
              ],
            }
          ]
        }
      }
    }
  },
  { provider: k8sProvider }
);

const redisService = new k8s.core.v1.Service(
  "redis",
  {
    metadata: {
      name: "redis",
      namespace: namespaceName,
    },
    spec: {
      type: "ClusterIP",
      ports: [{ port: 6379 }],
      selector: { app: "redis" }
    }
  },
  { provider: k8sProvider }
);

export const clusterLabel = lkeCluster.label;

export const ip = service.status.loadBalancer.apply((lb) => lb.ingress[0].ip || lb.ingress[0].hostname);
