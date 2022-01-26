import { Alert, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
class NotificationsHelper {
  getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });
  };

  refreshToken = () => {
    messaging().onTokenRefresh(token => {
      console.log(token);
    });
  };

  initializeFCM = () => {
    this.messageListener = messaging().onMessage(async remoteMessage => {
      //   this.dataAndMessageReceiveHandler(remoteMessage);
      this.onDisplayNotification(remoteMessage);
    });

    this.getToken();
  
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background!", remoteMessage);
    });


  };

  handleAndroidNotificationPost = async notification => {
    console.log("handleAndroidNotificationPost", notification);

    // Create a channel
    // const channelId = await notifee.createChannel({
    //   id: "default",
    //   name: "Default Channel"
    // });

    // // Display a notification
    // await notifee.displayNotification({
    //   // title: this.getLocalizedTitle(notification),
    //   // body: this.getLocalizedBody(notification),
    //   title: notification.notification.title,
    //   body: notification.notification.body,
    //   android: {
    //     channelId,
    //     smallIcon: "ic_launcher" // optional, defaults to 'ic_launcher'.
    //   }
    // });
  };

  onDisplayNotification = notification => {
      this.handleAndroidNotificationPost(notification);
  };
  /*
  The value returned is a number value, which can be mapped to one of the following values from messaging.AuthorizationStatus:
    -1 = messaging.AuthorizationStatus.NOT_DETERMINED: Permission has not yet been requested for your application.
    0 = messaging.AuthorizationStatus.DENIED: The user has denied notification permissions.
    1 = messaging.AuthorizationStatus.AUTHORIZED: The user has accept the permission & it is enabled.
    2 = messaging.AuthorizationStatus.PROVISIONAL: Provisional authorization has been granted.
  */

  checkFCMPermission = async () => {
    if (!Platform.OS === "android") {
      const authStatus = await messaging().requestPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    }
  };

  getInitialNotification = () => {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
  };

  appMount = () => {
    this.initializeFCM();
    this.checkFCMPermission();
    this.getInitialNotification();
  };

  unMount = () => {
    this.messageListener();
  };

 

  dataAndMessageReceiveHandler = notification => {
    const data = notification.data;

    console.log(data);
    alert("Received in foreground");
  };
 

  onDisplayLocalNotification = async () => {
    // Create a channel
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    // });
    // // Display a notification
    // await notifee.displayNotification({
    //   title: 'Notification Title',
    //   body: 'Main body content of the notification',
    //   android: {
    //     channelId,
    //     smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
    //   },
    // });
  };
}

export default new NotificationsHelper();
