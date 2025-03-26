import React, { useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Tts from 'react-native-tts';
import { useNotifications } from 'react-native-notification-listener';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    
    Tts.setDefaultLanguage('vi-VN');
    Tts.setDefaultRate(0.6);
  }, []);

  useNotifications((notification) => {
    console.log('New Notification:', notification);
    const { title, text } = notification;
    
    if (title.includes('Ngân hàng') || text.includes('Số dư')) {
      const balance = text.match(/\d+[.,]?\d*/g)?.[0];
      if (balance) {
        const message = `Bạn có giao dịch mới. Số dư hiện tại là ${balance} đồng.`;
        Tts.speak(message);
      }
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ứng dụng thông báo số dư</Text>
      <Button title="Test TTS" onPress={() => Tts.speak('Xin chào, đây là thông báo thử nghiệm!')} />
    </View>
  );
};

export default App;
