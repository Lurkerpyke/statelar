import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  action?: string;
  route?: string;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  action,
  route
}: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-6' />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className='size-5' />}
  </TouchableOpacity>
)

const Profile = () => {
  const router = useRouter();
  const { user, refetch } = useGlobalContext();

  const handleSettingPress = (setting: typeof settings[0]) => {
    if (setting.action === 'navigate' && setting.route) {
      router.push(setting.route as any);
    } else if (setting.action === 'bookings') {
      // Handle bookings
      Alert.alert('Minhas Reservas', 'Funcionalidade em desenvolvimento...');
    } else if (setting.action === 'payments') {
      // Handle payments
      Alert.alert('Pagamentos', 'Funcionalidade em desenvolvimento...');
    } else if (setting.action === 'profile') {
      // Handle profile edit
      Alert.alert('Editar Perfil', 'Funcionalidade em desenvolvimento...');
    } else if (setting.action === 'notifications') {
      // Handle notifications
      Alert.alert('Notificações', 'Funcionalidade em desenvolvimento...');
    } else if (setting.action === 'language') {
      // Handle language
      Alert.alert('Idioma', 'Funcionalidade em desenvolvimento...');
    } else if (setting.action === 'help') {
      // Handle help center
      Alert.alert('Central de Ajuda', 'Funcionalidade em desenvolvimento...');
    }
  };

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert('Logout', 'Você saiu com sucesso.');
      refetch({});
    } else {
      Alert.alert('Erro', 'Falha ao sair. Tente novamente.');
    }
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5' />
        </View>

        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{ uri: user?.avatar }} className='size-44 relative rounded-full' />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold  mt-2'>{user?.name}</Text>
          </View>
        </View>
        <View className='flex flex-col mt-10'>
          <SettingsItem
            icon={icons.calendar}
            title='Minhas Reservas'
            onPress={() => handleSettingPress({ title: 'Minhas Reservas', icon: icons.calendar, action: 'bookings', route: undefined })}
          />
          <SettingsItem
            icon={icons.wallet}
            title='Pagamentos'
            onPress={() => handleSettingPress({ title: 'Pagamentos', icon: icons.wallet, action: 'payments', route: undefined })}
          />
        </View>

        <View className='flex flex-col mt-5 border-t border-primary-200'>
          {settings.slice(2).map((item, index) => (
            <SettingsItem
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => handleSettingPress(item)}
              action={item.action}
              route={item.route}
            />
          ))}
        </View>
        <View className='flex flex-col mt-5 border-t border-primary-200'>
          <SettingsItem
            icon={icons.logout}
            title='Logout'
            textStyle='text-danger'
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Profile;