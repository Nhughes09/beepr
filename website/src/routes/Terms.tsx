import React from 'react';
import { Link, Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Stack } from '@chakra-ui/react';
import { Link as RouterLink, createRoute } from '@tanstack/react-router';
import { rootRoute } from '../App';

export const termsRoute = createRoute({
  component: Terms,
  path: "/terms",
  getParentRoute: () => rootRoute,
});

export function Terms() {
  return (
    <Stack alignItems="center" spacing={4}>
      <Heading size="2xl">Terms of Service</Heading>
      <Heading size="sm">Modified and Effective as of January 19, 2021</Heading>
      <Accordion allowMultiple allowToggle w="100%" defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              The Company
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Ride Beep App is owned and controlled by Ian & Banks LLC. For the purposes of this document, Ian & Banks LLC and the name of the mobile application, Ride Beep App, will be referred to as &ldquo;Beep&rdquo;. Beep is an online social media platform that allows users to connect with other users to provide their transportation and logistics services. For the purposes of this document those utilizing or providing transportation, goods, or logistical services will be referred to as &ldquo;Users.&rdquo; Beep in no way controls, owns, or operates the vehicles Users utilize before, during, or after services are rendered to them by Users or other Third Party Providers. Beep is committed to provide an easy to use platform for networking, in regards to affordable transportation services for students.Within this document the words &ldquo;including&quot; and &quot;include&quot; can be defined as &quot;including, but not limited to.&quot;
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Contractual Relationship
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Text>The Terms of Use being utilized also known as "Terms" govern the Users connection or use, within the borders of the United States of America and its respective territories and holdings, of the applications, websites, content, products, and services made available within the borders of the United States of America and its respective territories and holdings by Ian &amp; Banks LLC and its owners and creators. The term &ldquo;Services&rdquo; will be more thoroughly defined below. Be certain to read the Terms provided thoroughly, as these Terms create a legal agreement between you and Beep.</Text>
              <Text>By utilizing the Services rendered by Beep, you agree to be bound by these Terms. If you do not agree with the Terms provided, you will not access or use the Services offered. These Terms fully overrule previous contractual relationships or arrangements with the User in respect to the use of the Services.</Text>
              <Text>Notwithstanding the foregoing, these Terms do not overrule or otherwise impact the enforceability of any agreements you may have with Beep or its subsidiaries regarding the use of the Services provided. To the extent (but only to the extent) any agreement you may have with Beep in regards to the Services provided conflicts with these Terms, the agreements created (and not the Terms outlined in this document) prevail.</Text>
              <Text>Beep has the right to immediately abolish these Terms or any Services with respect to you, or generally cease from offering or deny access to the Services or any portion thereof, at any time for any reason.</Text>
              <Text><b>Arbitration Notice</b>: It is to your benefit to thoroughly review the Arbitration Agreement outlined below, as the agreement will hold you to resolve disputes with Beep on an individual basis through final and binding arbitration. By agreeing to this, you clearly acknowledge that you have thoroughly read and understand all of the Terms provided within this agreement and have taken sufficient time to consider the consequences of this decision.</Text>
              <Text>Supplemental terms may apply to certain Services, such as policies for a particular event, program, activity or promotional advertisement, and such supplemental terms will be provided to you in separate region-specific disclosures (e.g., a particular city webpage on ridebeep.app) or in connection with the Service(s) that apply. Supplemental terms are in addition to, and shall be deemed a part of, the Terms for the purposes of the applicable Service(s). Supplemental terms shall prevail over these Terms in the possible event of a conflict with respect to the applicable Services.</Text>
              <Text>Beep has the right to amend or alter the Terms from time to time. Amendments will be made effective upon their release by Beep. The updated Terms will be provided at this location or within the amended policies or supplemental terms on the applicable Service(s). By continuing to access or utilize the Services after the posting of new or existing Terms confirms your agreement to be bound by the Terms, as written. If Beep alters these Terms following the date you initially agreed to be bound by them (or to any following changes to these Terms), you may reject any such alteration by providing written notice via email to ian@ridebeep.app. This written disagreement must be sent within 30 days of the amendment being made &ldquo;Effective&rdquo;. Within the notice you must include the full name of the person associated with the Account and clearly indicate that you are rejecting the changes to the Terms. In rejecting changes made, you are agreeing to be bound by the Terms as of the date you first agreed to the Terms (or to the date prior to your rejection of changes to the Terms).</Text>
              <Text>The collection and use of personal information in relation to the Services rendered by Beep is outlined in Beep&rsquo;s Privacy Statements located on our privacy page found <Link as={RouterLink} to="/privacy">here</Link>.</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Agreement to Binding Arbitration
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Text>In agreeing to these Terms, you are agreeing that any disputes you have with Beep will be resolved on an individual basis through arbitration. This arbitration agreement will restrict you from bringing any class, collective, or representative action against Beep. This agreement also restricts you from participating in or recovering relief through any future class, collective, consolidated, or representative action against Beep by another party. &nbsp;</Text>
              <Heading size="sm">Binding Arbitration Agreement</Heading>
              <Text>You agree to resolve any dispute against Beep as a result of or in relation to these Terms or the existence, breech, abolition, enforcement, interpretation or validity thereof, or your ability to access or use any Services provided, whether prior to or following the date you agreed to the Terms, will be settled through binding arbitration between you and Beep, and not in a court of law.</Text>
              <Text>You acknowledge and agree that you and Beep are each dismissing your right to a trial by jury or to participate as a plaintiff in any class action lawsuit. These Terms can be negated, provided both you and Beep agree in writing to negate the binding arbitration portion of these Terms. By agreeing to these Terms you agree that any arbitration will be conducted on an individual basis and not in a class, collective, consolidated, or representative proceeding. You and Uber do retain the right to bring individual action in small claims court of proper jurisdiction to prevent any form of infringement, exploitation or violation of a party&rsquo;s copyrights, trademarks, trade secrets, patents or other intellectual property rights. &nbsp;</Text>
              <Text>The arbitration will be conducted in accordance with the American Arbitration Association&rsquo;s or &ldquo;AAA Rules&rdquo; and procedures in reference to consumer arbitration. These rules are available at www.adr.org or by calling them at 1-800-778-7879.</Text>
              <Text>The parties at hand agree that all disputes will be resolved through the use of an arbitrator provided by the AAA and not through any federal, state, or local court or agency. The arbitrator will have sole authority to resolve any disputes relating to the interpretation, applicability, enforceability or formation of the Arbitration Agreement. This includes any allegation that any or all parts of these Terms are void or voidable. The arbitrator provided by the AAA will be responsible for determining how any hearing will be conducted whether those hearings are conducted in person or through submissions of written statements.</Text>
              <Text>Notwithstanding any choice of law or statements in these Terms, the parties agree and acknowledge that this Arbitration Agreement has the possibility to create a transaction involving interstate commerce. As a result of the prior statement the Federal Arbitration Act, 9 U.S.C &sect; 1 et seq., will govern the interpretation and the enforcement of proceedings that may arise. By agreeing to these Terms you are agreeing to be bound by the laws and rules of the Federal Arbitration Act and the AAA and not state law. If the laws of the Federal Arbitration Act or the AAA do not apply to any issue that arises under the arbitration agreement or its enforcement, then that dispute will be resolved under the laws of the state of North Carolina.</Text>
              <Heading size="sm">The Operation of Arbitration</Heading>
              <Text>Whether it be a User or Beep, in order to begin arbitration one must submit to the other party a written Demand for Arbitration. The arbitrator provided by the AAA will be either a retired judge or an attorney specifically licensed to practice law in the State of North Carolina. If the parties at hand are unable to agree on an arbitrator within 7 days from the delivery of the Demands for Arbitration, then the AAA will appoint the appropriate arbitrator for the parties. To be informed of the AAA Rules one may call 1-800-778-7879 or visit their website at www.adr.org.</Text>
              <Text>Arbitration will take place in the county in which Beep resides which is currently Watauga County, North Carolina. This portion of the agreement can be altered, provided both parties agree in writing to a new location. If the claim of damages being presented to the arbitrator does not exceed $10,000, then the arbitration will be conducted through the use of submitted documents to the arbitrator. If you wish for a hearing to take place you must contact the arbitrator. The arbitrator also has the ability to create a hearing even if the claims amount to less than $10,000. The whole process of arbitration will take place in accordance with AAA Rules. &nbsp; &nbsp;</Text>
              <Heading size="sm">The Decision of the Arbitrator</Heading>
              <Text>The decision of the arbitrator will be final and binding to all parties involved. The arbitrator&#39;s decision and judgement will have no precedential or collateral estoppel effect. If you prevail in arbitration you will be entitled to an award of attorneys&rsquo; fees and expenses, to the extent under applicable law. The arbitrator will only award declaratory or injunctive relief only in favor of the claimant and only to provide relief warranted by the claimant&rsquo;s individual claim, provided the arbitrator does not find the claimant&rsquo;s claims to be frivolous in nature or was brought for an improper purpose. The arbitrator will render an award within the time frame laid out by the AAA Rules. Judgement on the arbitration award may be entered in any court having proper jurisdiction. &nbsp;</Text>
              <Heading size="sm">Fees</Heading>
              <Text>You are fully responsible for paying any AAA filing, administrative, and arbitrator fees as described in the rules of the AAA.</Text>
              <Heading size="sm">Changes</Heading>
              <Text>Beep reserves the right to amend the Terms and the arbitration agreement within. You do have the right to reject amendments to the arbitration agreement. If you so wish to object to any new amendments to the arbitration agreement you must submit in writing via email your full name, the email associated with your Account, and a clear intent to reject such changes. Please send any email in regards to an objection or objections to ian@ridebeep.app. This objection must be received within 30 days of the date an amendment was posted, in order to be Effective. By rejecting any changes, you are agreeing to resolve any disputes you may have with Beep via arbitration as of the first date you agreed to the Terms or to any following changes to the Terms.</Text>
              <Heading size="sm">Severability and Survival</Heading>
              <Text>If any portion of this arbitration agreement is found to be unenforceable or unlawful for any reason, the unenforceable or unlawful portion of this agreement shall be served from these Terms. The removal of the unenforceable or unlawful portion of this arbitration agreement will have no impact upon the rest of the arbitration agreement or the parties&rsquo; ability to compel arbitration of any claims on an individual basis in accordance with the arbitration agreement. If a court of competent jurisdiction requires a suit be brought not in accordance with the arbitration agreement but in a class, collective, consolidated or representative form, such claims will be litigated in a civil court of competent jurisdiction and not through arbitration. In this event the parties agree that litigation of those claims shall be stayed pending the outcome of any individual claims in arbitration.</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Services
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Text>The Services comprise of mobile applications and related services also known as an &ldquo;Application&rdquo;. These Services allow Users to schedule and arrange transportation and logistics services, discuss payment and payment methods, come in contact with an individual transportation provider, and discuss the time and location such services will be rendered by an individual. You acknowledge that Beep does not provide any form of transportation, logistical, and/or delivery services. You also acknowledge that Beep is not a provider of transportation, logistics or delivery services or is a transportation carrier. You also acknowledge that all those who provide transportation, goods, and logistics services are independent of Beep and in no way are connected to or represent the company or any third party associated with Beep.</Text>
              <Heading size="sm">License</Heading>
              <Text>So long as you remain compliant with these Terms, Beep grants you a limited, non-sublicensable, non-transferable, revocable, non-exclusive license to access and use the Applications on your personal electronic device solely in connection with your use of the Services. Beep also grants you access to use any information, content and related materials that may be made available through the Services, in each case for your personal, noncommercial use. Any rights not specifically granted herein are reserved by Beep.</Text>
              <Heading size="sm">Restrictions</Heading>
              <Text>You may not remove, disassemble, or mutilate any trademark, copyright, or other proprietary notices from any portion of the Services without the written consent of Beep. You may not reproduce, alter, create similar works based on, license, distribute, sell, lease, resell, transfer, exploit, publicly perform, transmit, broadcast, stream, the Services without the written consent of Beep. You may not, unless permitted by applicable law; deconstruct, reverse engineer or decompile the Services. You may not link to, copy or frame any portion of the Services; cause, create or execute any programs or scripts to data mine, scrap, index, or survey any part of the Services; gain or attempt to gain unauthorized access to or impair or burden any portion or aspect of the Services or any back-end system responsible for upholding the integrity and function of the Services owned by Beep or any company Beep is in a business relationship with.</Text>
              <Text>Third Party Services and Content</Text>
              <Text>The Services can be used or accessed by third party services and content that Beep has no control over. You acknowledge that different terms of use and privacy policies may apply to the use of third party services and content. Beep does not endorse these third parties and is in no way responsible or liable for any products or services of third parties. Apple Inc. and Google, Inc. are third party beneficiaries to this agreement if you access the Services using Applications owned or developed for Apple&rsquo;s iOS system and Google&rsquo;s Android system. These third parties are not bound by this contract and are not responsible for the furthering or support of the Services. In your accessing of the Services you are subject to the terms outlined by the third parties individual terms of service. &nbsp; &nbsp;</Text>
              <Heading size="sm">Ownership</Heading>
              <Text>The Services and all rights therein are the property of Beep or of Beep&rsquo;s respective licensors. These Terms and the use of the Services provided do not grant you the right to the ownership of anything with exception to the limited license as described above. These Terms and the use of the Services provided do not provide you the right to use the company names of Beep, its logos, product names, service names, trademarks, trade secrets, or the trademarks, Services, and trade secrets of Beep&rsquo;s licensors. The use of Beep&rsquo;s logos, product names, service names, trademarks can be utilized by non-employees of Beep provided Beep grants those individuals or businesses the right to use them in written form.</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Access and Use of the Services
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Heading size="sm">User Accounts</Heading>
              <Text>To be able to use the Services rendered to the User one must create and maintain an active personal User Services Account. This will be referred to as the &ldquo;Account.&rdquo; By agreeing to these Terms you certify that you are 18 years or older, or the legal age that allows one to enter into contracts in your jurisdiction, unless a specific Service permit suggests otherwise. Account registration requires the individual to submit their name, mobile phone number, age, and a valid Venmo account username. You agree to maintain accurate, complete, and up-to-date information within your Account. Failure to maintain accurate, complete, and up-to-date information within your Account, can result in your inability to access or use the Services. You are responsible for all activity that occurs on your Account, and are responsible for maintaining the secrecy and security of your Account username and password. You may have ownership of only one Account, unless explicitly permitted by Beep in writing. &nbsp; </Text>
              <Text>User Requirements and Conduct</Text>
              <Text>To use the Services one must be 18 years or older. You may not authorize any third parties to use your Account or to allow a person below the age of 18 to request or come in contact with an individual providing transportation or logistical services. When one is acting as a User who provides transportation or logistical services that person may not solicit or offer services to individuals below the age of 18. You agree to comply with all applicable laws when accessing or using the Services rendered to you, and you may only access or utilize the Services in and for a lawful manner. While in use of the Services you may not cause a nuisance, annoyance, inconvenience, or property damage to the Third Party Provider or to any other party. If you fail to comply with these Terms, you may be denied access to the Services. You may also from time to time be required to provide proof of identity (to prove legal age). If you fail to provide a proper form of identification you will be subject to the loss of Services. &nbsp;</Text>
              <Heading size="sm">Text Messaging and Telephone Calls</Heading>
              <Text>You agree that Beep may contact you by telephone, text messages, or email at any of the phone numbers or emails provided by you on your behalf in connection with a Beep Account, as well as for marketing purposes. Users can request to opt out of receiving promotional emails by providing written notice via email from the email address associated with your Account to: ian@ridebeep.app. In order to be Effective, the notice must include your full name and clearly indicate that you wish to be taken off of the telephone and/or the text message list(s). If you do not choose to opt out, Beep may contact you as outlined in its Privacy Policy, located on our privacy page located <Link as={RouterLink} to="/privacy">here</Link>. You agree that those providing transportation, goods, or logistical services may contact you via telephone or text messaging for the purposes of providing transportation, goods, or logistical services. You agree to only contact those who have provided their phone number to Beep for the sole and explicit purpose of providing transportation, goods, or logistical services. You understand that Beep is not responsible for any data, content, or information provided via telephone or text messaging systems to you. You understand that all forms of communication between Users is done at the expense and at the personal risk of the User. If data, content, or information is provided to a User from a User that is unsolicited and not in reference to a request from a User to provide transportation, goods, or logistical services you may submit a complaint to ian@ridebeep.app. In this email, please provide your full name, the email associated with your account and evidence in reference to the data, content, or information that was provided without your consent and not in reference to requested transportation, goods, or logistical services.</Text>
              <Heading size="sm">User Provided Content</Heading>
              <Text>Beep may, at some times request you to submit, upload, publish or otherwise make available to Beep textual, audio, and/or visual content and information, including commentary and feedback in relation to the Services. These submissions of text, audio, and/or visual content and information, including commentary and feedback is completely voluntary and not required by the User. Content created by you remains your property. If such content is willingly provided to Beep, you grant Beep a worldwide, perpetual, irrevocable, transferable, royalty-free license, with the right of Beep to sublicense, use, copy, create derivative works of, alter, make available, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels that have been conceived or are to be conceived in the future, without further notice to or consent from the creator, and without the requirement of payment to you or any other person or entity. &nbsp;</Text>
              <Text>You hereby state that: you are the sole owner of all rights, licenses, consents, and releases that are required to grant Beep the license to the User Consent as clearly stated above; and neither the User Content, nor your submission, uploading, publishing, or otherwise making available of such User Content, nor Beep&rsquo;s use of the User Content as permitted herein will infringe, violate or misappropriate a third party&rsquo;s intellectual property or other proprietary rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation. </Text>
              <Text>You agree to not post or provide User Content that is libelous, hateful, violent, defamatory, obscene, pornographic, unlawful, or otherwise offensive, as determined by Beep in its sole discretion, whether or not those materials are protected by law. Beep has the right, but is not required to, review, monitor, or remove User Content, at Beep&rsquo;s sole discretion at any time and for any reason, without any prior or current notice to you.</Text>
              <Heading size="sm">Network Access and Devices</Heading>
              <Text>In using the Services provided, you are responsible for obtaining the data network access to utilize the Services. Mobile network data and messaging rates and fees may apply if you access or use the Services from your device. You are responsible for acquiring and updating compatible hardware or devices needed to access and utilize the Services and Applications and any updates thereto. Beep does not guarantee that any Services provided will function on any specific device or hardware. In addition, the Services may experience malfunctions and delays that occur in the use of the internet and electronic communications. &nbsp; </Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Payment
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Text>You understand that all transactions between Users are conducted separately from Beep. Beep is not responsible for fees incurred such as other applicable fees, tolls, and/or surcharges including a booking fee, municipal tolls, airport surcharges or processing fees for split payments before, during or after the transportation of an individual or individuals. All transactions are to be conducted through an agreed upon medium between the Users utilizing and providing transportation, goods, or logistical services. Because no monetary contractual relationship is ever created between the User and Beep, it should be understood that by agreeing to this you understand that all suits brought against the User utilizing transportation, goods, or logistical services in reference to lack of payment, does not involve Beep. Because no monetary contractual relationship is ever created between the User and Beep, it should be understood that all suits brought against the User providing transportation, goods, or logistical services for lack of service, does not involve Beep. </Text>
              <Heading size="sm">Repair, Cleaning and Property Disputes</Heading>
              <Text>You shall be solely responsible for the cost of repair for damage to, or cleaning of, vehicles and property resulting from the use of the Services. Beep is not responsible for any property stolen, lost, commendered, destroyed, damaged, or altered before, during or after the use of the Services. It is the responsibility of the Users to identify and return items that were lost while using the Services. It is also the responsibility of the Users to settle disputes in regards to lost, stolen, damaged, destroyed or altered items that were affected while in use of the Services. &nbsp; &nbsp; &nbsp;</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Disclaimers
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>These Services are rendered to the User &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; Beep does not recognize or support any representations and warranties, express, implied, or statutory, not specifically provided in these Terms, including the implied warranties of merchantability, fitness for a particular purpose and non-infringement. Beep does not create any representation, warranty, or guarantee in relation to the availability of the use of the Services or any Services or goods requested through the Services. Beep does not create any representation, warranty, or guarantee that the Services will be uninterrupted, free of errors, or glitches. Beep does not ensure the suitability, quality, ability or safety of any third party provider. You agree that the entire risk of your use of the Services, and any Service, transportation service, goods, or logistical service requested in connection therewith, remains solely with you, to the maximum extent allowed under applicable law. &nbsp;</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Limitation of Liability
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Text>Even if Beep has been informed or advised of the possibility of damages, incidental, indirect, special, exemplary, consequential, or punitive damages, including lost profits, lost data, personal injury, or property damaged, lost, or stolen, in connection with, related to, or otherwise resulting from any use of the Services, regardless of the negligence by Beep either active, affirmative, sole, or concurrent, Beep shall not be liable. </Text>
              <Text>Beep shall not be liable for for any damages, liability or losses as a result of: your use of or reliance upon the Services rendered; or any transaction or relationship (formal or informal) between you and any third party provider, even if Beep has been or is made aware of the possibility of such damages. Beep shall not be liable for delay or failure of performance as a result of circumstances out of the reasonable control of Beep. You acknowledge that third party providers soliciting transportation, goods, and logistical services through the use of the Services requested by the User may offer transportation, goods, logistical services, ridesharing, and peer-to-peer transportation without being professionally licensed or permitted. &nbsp; </Text>
              <Text>The Services may be used by you to network with those providing transportation, goods, or logistics services or by those wishing to receive transportation, goods, or logistics services with third party providers, but you agree that Beep holds no responsibility or liability to you in relation to any transportation, goods or logistics services provided to you by third party providers other than as expressly stated in these Terms. Users provide transportation, goods, and logistical services at their own personal risk. Users may also receive transportation, goods, or logistical services at their own personal risk. </Text>
              <Text>The limitations and disclaimer created in this section do not appear or try to limit liability or alter the rights you hold as a consumer that cannot be removed under applicable law. Because some states or jurisdictions do not allow the removal of or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, Beep&rsquo;s liability shall be limited to the extent permitted by law. This provision shall have no effect on Beep&rsquo;s choice of law provisions as stated below. &nbsp;</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Indemnity
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>You agree to not hold Beep and its affiliates and their officers, directors, employees, and agents liable or responsible for any and all claims, demands, losses, liabilities, and expenses (including attorneys&rsquo; fees), as a result of or in connection with: your use of the Services or services or goods obtained through the use of the Services; your breach or violation of any of these Terms; Beep&rsquo;s use of your Use Content; or your violation of the rights of any third party, including Third Party Providers. &nbsp;</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontWeight="bold" fontSize="xl">
              Other Provisions
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Heading size="sm">Choice of Law</Heading>
              <Text>These Terms are governed by and construed in alignment with the laws of the State of North Carolina, without creating effect to any conflict of law principles, except as may be stated otherwise in the creation of the Arbitration Agreement above or in supplemental terms applicable to your region. However, the choice of law provision in relation to the interpretation of these Terms is not intended to create any other right to non-North Carolinians to assert claims under North Carolina law whether that be by status, common law, or otherwise. These provisions, except as otherwise created in Section Two of these Terms, are only intended to specify the use of North Carolina law to you if you do not otherwise reside in North Carolina. As previously stated the choice of law and forum selection provisions do not apply to the Arbitration Clause in Section Two, the Federal Arbitration Act shall apply to any such disputes. </Text>
              <Heading size="sm">Claims of Copyright Infringement</Heading>
              <Text>Any claim of copyright infringement should be sent to ian@ridebeep.app. Please include your full name and possible link or evidence of copyright infringement. </Text>
              <Heading size="sm">Legal Notices</Heading>
              <Text>Beep may provide a general notice in relation to the Services to you via electronic mail to your email address associated with your Account or via telephone or text message to any phone number associated with your Account. You may provide notice to Beeb, with such notice deemed given when received by Beep, at any time via email to ian@ridebeep.app. &nbsp;</Text>
              <Heading size="sm">General</Heading>
              <Text>You are not afforded the right to assign these Terms without the prior written consent of Beep. Without your consent Beep may assign these Terms to: an affiliate or subsidiary; an acquirer of Beep&rsquo;s equity, business or assets; or a successor as a result of a merger. Any claim of assigning these Terms in violation of this section shall be void. No partnership, joint venture, employment, or agency relationship is created between you, Beep or any Third Party Provider as a result of this Agreement or use of the Services. If any provisions shall be unenforceable, such provisions shall be struck and the remaining provisions shall be enforced and unaffected to the fullest extent provided under applicable law. Beep&rsquo;s failure to enforce any right or provision in these Terms shall not create a waiver of such right or provision unless Beep has acknowledged and agreed to this waiver in writing. This provision shall in no way affect the Severability and Survivability section of the Arbitration Agreement within these Terms. &nbsp;</Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
