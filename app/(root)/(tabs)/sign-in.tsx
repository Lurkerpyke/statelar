import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';

const SignIn = () => {

  const handleLogin = () => {};

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image
          source={images.onboarding}
          className="w-full h-4/6" resizeMode="contain">
        </Image>

        <View className='px-10'>
          <Text className='font-rubik text-base uppercase text-center text-black-200'>Bem Vindo à Statelar</Text>
          <Text className='font-rubik-bold text-3xl text-center text-black-300 mt-2'>Encontre a sua {"\n"}
            <Text className='text-primary-300'>Casa Dos Sonhos</Text>
          </Text>
          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Faça login com Google</Text>
          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-lg shadow-zinc-500 rounded-full w-full py-4 mt-5'>
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-6 h-6' resizeMode='contain' />
              <Text className='text-md font-rubik-medium text-black-300 ml-2'>Entrar com Google</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
};

export default SignIn;