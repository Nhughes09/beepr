/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'AnonymousBeeper': { kind: 'OBJECT'; name: 'AnonymousBeeper'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'latitude': { name: 'latitude'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'longitude': { name: 'longitude'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; }; };
    'Auth': { kind: 'OBJECT'; name: 'Auth'; fields: { 'tokens': { name: 'tokens'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Token'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'Beep': { kind: 'OBJECT'; name: 'Beep'; fields: { 'beeper': { name: 'beeper'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'destination': { name: 'destination'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'end': { name: 'end'; type: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; } }; 'groupSize': { name: 'groupSize'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'origin': { name: 'origin'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'position': { name: 'position'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'rider': { name: 'rider'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'start': { name: 'start'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'status': { name: 'status'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'BeeperSettingsInput': { kind: 'INPUT_OBJECT'; name: 'BeeperSettingsInput'; isOneOf: false; inputFields: [{ name: 'singlesRate'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'groupRate'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'capacity'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'isBeeping'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'latitude'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'longitude'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }]; };
    'BeepsResponse': { kind: 'OBJECT'; name: 'BeepsResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; }; };
    'Boolean': unknown;
    'Car': { kind: 'OBJECT'; name: 'Car'; fields: { 'color': { name: 'color'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'created': { name: 'created'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'default': { name: 'default'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'make': { name: 'make'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'model': { name: 'model'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'photo': { name: 'photo'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updated': { name: 'updated'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'year': { name: 'year'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; }; };
    'CarsResponse': { kind: 'OBJECT'; name: 'CarsResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Car'; ofType: null; }; }; }; } }; }; };
    'ChangePasswordInput': { kind: 'INPUT_OBJECT'; name: 'ChangePasswordInput'; isOneOf: false; inputFields: [{ name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'DateTimeISO': unknown;
    'EditUserInput': { kind: 'INPUT_OBJECT'; name: 'EditUserInput'; isOneOf: false; inputFields: [{ name: 'first'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'last'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'venmo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'cashapp'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'isBeeping'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isEmailVerified'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'isStudent'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'groupRate'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'singlesRate'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'capacity'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'queueSize'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'role'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'pushToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'photo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'username'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Feedback': { kind: 'OBJECT'; name: 'Feedback'; fields: { 'created': { name: 'created'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'FeedbackResonse': { kind: 'OBJECT'; name: 'FeedbackResonse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Feedback'; ofType: null; }; }; }; } }; }; };
    'File': unknown;
    'Float': unknown;
    'GetBeepInput': { kind: 'INPUT_OBJECT'; name: 'GetBeepInput'; isOneOf: false; inputFields: [{ name: 'origin'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'destination'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'groupSize'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; }; defaultValue: null }]; };
    'Int': unknown;
    'LocationInput': { kind: 'INPUT_OBJECT'; name: 'LocationInput'; isOneOf: false; inputFields: [{ name: 'latitude'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; }; defaultValue: null }, { name: 'longitude'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; }; defaultValue: null }, { name: 'altitude'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'accuracy'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'altitudeAccuracy'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'heading'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }, { name: 'speed'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; defaultValue: null }]; };
    'LoginInput': { kind: 'INPUT_OBJECT'; name: 'LoginInput'; isOneOf: false; inputFields: [{ name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'pushToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'addProfilePicture': { name: 'addProfilePicture'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'cancelBeep': { name: 'cancelBeep'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'changePassword': { name: 'changePassword'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'checkUserSubscriptions': { name: 'checkUserSubscriptions'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Payment'; ofType: null; }; }; } }; 'chooseBeep': { name: 'chooseBeep'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; } }; 'clearQueue': { name: 'clearQueue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'createCar': { name: 'createCar'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Car'; ofType: null; }; } }; 'createFeedback': { name: 'createFeedback'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Feedback'; ofType: null; }; } }; 'deleteAccount': { name: 'deleteAccount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'deleteBeep': { name: 'deleteBeep'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'deleteCar': { name: 'deleteCar'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'deleteRating': { name: 'deleteRating'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'deleteReport': { name: 'deleteReport'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'editCar': { name: 'editCar'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Car'; ofType: null; }; } }; 'editUser': { name: 'editUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'forgotPassword': { name: 'forgotPassword'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'leaveQueue': { name: 'leaveQueue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'login': { name: 'login'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Auth'; ofType: null; }; } }; 'logout': { name: 'logout'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'rateUser': { name: 'rateUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'removeToken': { name: 'removeToken'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'removeUser': { name: 'removeUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'reportUser': { name: 'reportUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'resendEmailVarification': { name: 'resendEmailVarification'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'resetPassword': { name: 'resetPassword'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'sendDuplicateEmailNotification': { name: 'sendDuplicateEmailNotification'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UserWithBeeps'; ofType: null; }; }; }; } }; 'sendNotification': { name: 'sendNotification'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'sendNotifications': { name: 'sendNotifications'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'setBeeperQueue': { name: 'setBeeperQueue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; 'setBeeperStatus': { name: 'setBeeperStatus'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'setLocation': { name: 'setLocation'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'signup': { name: 'signup'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Auth'; ofType: null; }; } }; 'updateReport': { name: 'updateReport'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Report'; ofType: null; }; } }; 'verifyAccount': { name: 'verifyAccount'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'Payment': { kind: 'OBJECT'; name: 'Payment'; fields: { 'created': { name: 'created'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'expires': { name: 'expires'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'price': { name: 'price'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'productId': { name: 'productId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'store': { name: 'store'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'storeId': { name: 'storeId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'PaymentResponse': { kind: 'OBJECT'; name: 'PaymentResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Payment'; ofType: null; }; }; }; } }; }; };
    'Point': { kind: 'OBJECT'; name: 'Point'; fields: { 'latitude': { name: 'latitude'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'longitude': { name: 'longitude'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'getAllBeepersLocation': { name: 'getAllBeepersLocation'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'AnonymousBeeper'; ofType: null; }; }; }; } }; 'getBeep': { name: 'getBeep'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; } }; 'getBeepers': { name: 'getBeepers'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; }; }; } }; 'getBeeps': { name: 'getBeeps'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'BeepsResponse'; ofType: null; }; } }; 'getCars': { name: 'getCars'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'CarsResponse'; ofType: null; }; } }; 'getETA': { name: 'getETA'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'getFeedback': { name: 'getFeedback'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'FeedbackResonse'; ofType: null; }; } }; 'getInProgressBeeps': { name: 'getInProgressBeeps'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'BeepsResponse'; ofType: null; }; } }; 'getLastBeepToRate': { name: 'getLastBeepToRate'; type: { kind: 'OBJECT'; name: 'Beep'; ofType: null; } }; 'getPaymentHistory': { name: 'getPaymentHistory'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaymentResponse'; ofType: null; }; } }; 'getPayments': { name: 'getPayments'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'PaymentResponse'; ofType: null; }; } }; 'getQueue': { name: 'getQueue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; 'getRating': { name: 'getRating'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null; }; } }; 'getRatings': { name: 'getRatings'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'RatingsResponse'; ofType: null; }; } }; 'getRedisChannels': { name: 'getRedisChannels'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; }; } }; 'getReport': { name: 'getReport'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Report'; ofType: null; }; } }; 'getReports': { name: 'getReports'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'ReportsResponse'; ofType: null; }; } }; 'getRiderStatus': { name: 'getRiderStatus'; type: { kind: 'OBJECT'; name: 'Beep'; ofType: null; } }; 'getUser': { name: 'getUser'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'getUsers': { name: 'getUsers'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersResponse'; ofType: null; }; } }; 'getUsersPerDomain': { name: 'getUsersPerDomain'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersPerDomain'; ofType: null; }; }; }; } }; 'getUsersWithBeeps': { name: 'getUsersWithBeeps'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersWithBeepsResponse'; ofType: null; }; } }; 'getUsersWithDuplicateEmails': { name: 'getUsersWithDuplicateEmails'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UserWithBeeps'; ofType: null; }; }; }; } }; 'getUsersWithRides': { name: 'getUsersWithRides'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersWithRidesResponse'; ofType: null; }; } }; }; };
    'Rating': { kind: 'OBJECT'; name: 'Rating'; fields: { 'beep': { name: 'beep'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'message': { name: 'message'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'rated': { name: 'rated'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'rater': { name: 'rater'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'stars': { name: 'stars'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'timestamp': { name: 'timestamp'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; }; };
    'RatingInput': { kind: 'INPUT_OBJECT'; name: 'RatingInput'; isOneOf: false; inputFields: [{ name: 'userId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'stars'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; }; defaultValue: null }, { name: 'message'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'beepId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'RatingsResponse': { kind: 'OBJECT'; name: 'RatingsResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null; }; }; }; } }; }; };
    'Report': { kind: 'OBJECT'; name: 'Report'; fields: { 'beep': { name: 'beep'; type: { kind: 'OBJECT'; name: 'Beep'; ofType: null; } }; 'handled': { name: 'handled'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'handledBy': { name: 'handledBy'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'notes': { name: 'notes'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'reason': { name: 'reason'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'reported': { name: 'reported'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'reporter': { name: 'reporter'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; 'timestamp': { name: 'timestamp'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; }; } }; }; };
    'ReportInput': { kind: 'INPUT_OBJECT'; name: 'ReportInput'; isOneOf: false; inputFields: [{ name: 'userId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'reason'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'beepId'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'ReportsResponse': { kind: 'OBJECT'; name: 'ReportsResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Report'; ofType: null; }; }; }; } }; }; };
    'ResetPasswordInput': { kind: 'INPUT_OBJECT'; name: 'ResetPasswordInput'; isOneOf: false; inputFields: [{ name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'SignUpInput': { kind: 'INPUT_OBJECT'; name: 'SignUpInput'; isOneOf: false; inputFields: [{ name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'first'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'last'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'phone'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'venmo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'cashapp'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'picture'; type: { kind: 'SCALAR'; name: 'File'; ofType: null; }; defaultValue: null }, { name: 'pushToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'String': unknown;
    'Subscription': { kind: 'OBJECT'; name: 'Subscription'; fields: { 'getBeeperLocationUpdates': { name: 'getBeeperLocationUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'AnonymousBeeper'; ofType: null; }; } }; 'getBeeperUpdates': { name: 'getBeeperUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; 'getLocationUpdates': { name: 'getLocationUpdates'; type: { kind: 'OBJECT'; name: 'Point'; ofType: null; } }; 'getRiderUpdates': { name: 'getRiderUpdates'; type: { kind: 'OBJECT'; name: 'Beep'; ofType: null; } }; 'getUserUpdates': { name: 'getUserUpdates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'Token': { kind: 'OBJECT'; name: 'Token'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'tokenid': { name: 'tokenid'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'UpdateQueueEntryInput': { kind: 'INPUT_OBJECT'; name: 'UpdateQueueEntryInput'; isOneOf: false; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'status'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'UpdateReportInput': { kind: 'INPUT_OBJECT'; name: 'UpdateReportInput'; isOneOf: false; inputFields: [{ name: 'handled'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'notes'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'capacity': { name: 'capacity'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'cars': { name: 'cars'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Car'; ofType: null; }; }; } }; 'cashapp': { name: 'cashapp'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; } }; 'email': { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'first': { name: 'first'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'groupRate': { name: 'groupRate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'isBeeping': { name: 'isBeeping'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'isEmailVerified': { name: 'isEmailVerified'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'isStudent': { name: 'isStudent'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'last': { name: 'last'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Point'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'password': { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'passwordType': { name: 'passwordType'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'payments': { name: 'payments'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Payment'; ofType: null; }; }; } }; 'phone': { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'photo': { name: 'photo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'pushToken': { name: 'pushToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'queue': { name: 'queue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; 'queueSize': { name: 'queueSize'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'rating': { name: 'rating'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'ratings': { name: 'ratings'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null; }; }; }; } }; 'role': { name: 'role'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'singlesRate': { name: 'singlesRate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'username': { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'venmo': { name: 'venmo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'UserWithBeeps': { kind: 'OBJECT'; name: 'UserWithBeeps'; fields: { 'beeps': { name: 'beeps'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'capacity': { name: 'capacity'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'cars': { name: 'cars'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Car'; ofType: null; }; }; } }; 'cashapp': { name: 'cashapp'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'DateTimeISO'; ofType: null; } }; 'email': { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'first': { name: 'first'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'groupRate': { name: 'groupRate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'isBeeping': { name: 'isBeeping'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'isEmailVerified': { name: 'isEmailVerified'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'isStudent': { name: 'isStudent'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'last': { name: 'last'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Point'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'password': { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'passwordType': { name: 'passwordType'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'payments': { name: 'payments'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Payment'; ofType: null; }; }; } }; 'phone': { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'photo': { name: 'photo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'pushToken': { name: 'pushToken'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'queue': { name: 'queue'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Beep'; ofType: null; }; }; }; } }; 'queueSize': { name: 'queueSize'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'rating': { name: 'rating'; type: { kind: 'SCALAR'; name: 'Float'; ofType: null; } }; 'ratings': { name: 'ratings'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Rating'; ofType: null; }; }; }; } }; 'role': { name: 'role'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'singlesRate': { name: 'singlesRate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'username': { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'venmo': { name: 'venmo'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'UsersPerDomain': { kind: 'OBJECT'; name: 'UsersPerDomain'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'domain': { name: 'domain'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'UsersResponse': { kind: 'OBJECT'; name: 'UsersResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; }; }; } }; }; };
    'UsersWithBeeps': { kind: 'OBJECT'; name: 'UsersWithBeeps'; fields: { 'beeps': { name: 'beeps'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'UsersWithBeepsResponse': { kind: 'OBJECT'; name: 'UsersWithBeepsResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersWithBeeps'; ofType: null; }; }; }; } }; }; };
    'UsersWithRides': { kind: 'OBJECT'; name: 'UsersWithRides'; fields: { 'rides': { name: 'rides'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Float'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'UsersWithRidesResponse': { kind: 'OBJECT'; name: 'UsersWithRidesResponse'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'items': { name: 'items'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'UsersWithRides'; ofType: null; }; }; }; } }; }; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: 'Subscription';
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}