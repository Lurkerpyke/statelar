import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BenefitProps {
    icon: string;
    title: string;
    description: string;
}

const BenefitCard = ({ title, description }: Omit<BenefitProps, 'icon'>) => (
    <View className='bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl p-4 mb-3 border border-primary-200'>
        <Text className='text-base font-rubik-bold text-black-300 mb-1'>{title}</Text>
        <Text className='text-sm font-rubik text-black-200'>{description}</Text>
    </View>
);

const Invite = () => {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    // Mock referral code - in production, this would come from your API
    const referralCode = 'STATELAR2024LEAND';
    const referralLink = `https://statelar.app/ref/${referralCode}`;

    const handleCopyCode = () => {
        // In a real app, use react-native-clipboard
        Alert.alert('Código Copiado!', `Seu código de convite "${referralCode}" foi copiado para a área de transferência.`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareViaApp = async () => {
        try {
            await Share.share({
                message: `Junte-se a mim no Statelar! Use meu código de convite: ${referralCode}\n\nBaixe agora e ganhe créditos de boas-vindas!\n\n${referralLink}`,
                title: 'Convide um amigo para o Statelar',
                url: referralLink,
            });
        } catch (error) {
            Alert.alert('Erro', 'Falha ao compartilhar. Tente novamente.');
        }
    };

    const handleShareWhatsApp = () => {
        const message = `Oi! 👋 Estou usando o Statelar e estou amando! 🎉\n\nUse meu código de convite para ganhar créditos especiais:\n\n📱 Código: ${referralCode}\n\nOu clique aqui: ${referralLink}`;
        Alert.alert('WhatsApp', 'Abra o WhatsApp e cole a mensagem abaixo:\n\n' + message);
    };

    const handleShareEmail = () => {
        const subject = 'Vem conhecer o Statelar comigo!';
        const body = `Olá!\n\nGostaria de convidá-lo para usar o Statelar, um aplicativo incrível para encontrar acomodações.\n\nUse meu código de convite para ganhar créditos de boas-vindas:\n\nCódigo: ${referralCode}\nLink: ${referralLink}\n\nAte logo!`;
        Alert.alert('Email', `Assunto: ${subject}\n\nCorpo:\n${body}`);
    };

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                {/* Header */}
                <View className='flex flex-row items-center justify-between mt-5 mb-6'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.backArrow} className='size-6' />
                    </TouchableOpacity>
                    <Text className='text-xl font-rubik-bold flex-1 text-center'>Convide Amigos</Text>
                    <View className='w-6' />
                </View>

                {/* Hero Section */}
                <View className='bg-gradient-to-b from-primary-200 to-primary-100 rounded-2xl p-6 mb-6 items-center'>
                    <Text className='text-3xl mb-2'>🎁</Text>
                    <Text className='text-2xl font-rubik-bold text-black-300 text-center mb-2'>
                        Ganhe Créditos!
                    </Text>
                    <Text className='text-sm font-rubik text-black-200 text-center'>
                        Convide amigos e ambos ganham R$ 50 em créditos
                    </Text>
                </View>

                {/* Main Invitation Code Section */}
                <View className='bg-white border-2 border-primary-300 rounded-2xl p-6 mb-6'>
                    <Text className='text-sm font-rubik-bold text-primary-300 uppercase mb-3'>
                        Seu código de convite
                    </Text>

                    <View className='bg-primary-50 rounded-xl p-4 mb-4 border border-primary-200'>
                        <Text className='text-center text-2xl font-rubik-bold text-black-300 tracking-widest'>
                            {referralCode}
                        </Text>
                    </View>

                    <Text className='text-xs font-rubik text-black-200 text-center mb-4'>
                        Compartilhe este código com seus amigos
                    </Text>

                    <TouchableOpacity
                        onPress={handleCopyCode}
                        className={`rounded-lg p-4 flex flex-row items-center justify-center gap-2 ${copied ? 'bg-green-100 border border-green-300' : 'bg-primary-300'
                            }`}
                    >
                        <Text className='text-lg'>{copied ? '✓' : '📋'}</Text>
                        <Text className={`font-rubik-bold ${copied ? 'text-green-700' : 'text-white'}`}>
                            {copied ? 'Copiado!' : 'Copiar Código'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Share Options */}
                <View className='mb-6'>
                    <Text className='text-base font-rubik-bold text-black-300 mb-4'>
                        Compartilhe por
                    </Text>

                    <TouchableOpacity
                        onPress={handleShareViaApp}
                        className='bg-blue-500 rounded-lg p-4 mb-3 flex flex-row items-center gap-3'
                    >
                        <Text className='text-2xl'>📱</Text>
                        <View className='flex-1'>
                            <Text className='text-white font-rubik-bold'>Aplicativo de Mensagens</Text>
                            <Text className='text-blue-100 text-xs font-rubik'>SMS, iMessage, Telegram</Text>
                        </View>
                        <Image source={icons.rightArrow} className='size-5' tintColor='white' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleShareWhatsApp}
                        className='bg-green-500 rounded-lg p-4 mb-3 flex flex-row items-center gap-3'
                    >
                        <Text className='text-2xl'>💬</Text>
                        <View className='flex-1'>
                            <Text className='text-white font-rubik-bold'>WhatsApp</Text>
                            <Text className='text-green-100 text-xs font-rubik'>Envie para seus contatos</Text>
                        </View>
                        <Image source={icons.rightArrow} className='size-5' tintColor='white' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleShareEmail}
                        className='bg-orange-500 rounded-lg p-4 flex flex-row items-center gap-3'
                    >
                        <Text className='text-2xl'>✉️</Text>
                        <View className='flex-1'>
                            <Text className='text-white font-rubik-bold'>Email</Text>
                            <Text className='text-orange-100 text-xs font-rubik'>Envie um convite formal</Text>
                        </View>
                        <Image source={icons.rightArrow} className='size-5' tintColor='white' />
                    </TouchableOpacity>
                </View>

                {/* How It Works */}
                <View className='mb-6'>
                    <Text className='text-base font-rubik-bold text-black-300 mb-4'>
                        Como funciona
                    </Text>

                    <View className='flex flex-row mb-4'>
                        <View className='items-center mr-4'>
                            <View className='w-10 h-10 rounded-full bg-primary-300 items-center justify-center mb-2'>
                                <Text className='text-white font-rubik-bold'>1</Text>
                            </View>
                            <View className='w-1 h-12 bg-primary-200' />
                        </View>
                        <View className='flex-1 pt-1'>
                            <Text className='font-rubik-bold text-black-300 mb-1'>Convide seus amigos</Text>
                            <Text className='text-xs font-rubik text-black-200'>
                                Compartilhe seu código ou link de convite
                            </Text>
                        </View>
                    </View>

                    <View className='flex flex-row mb-4'>
                        <View className='items-center mr-4'>
                            <View className='w-10 h-10 rounded-full bg-primary-300 items-center justify-center mb-2'>
                                <Text className='text-white font-rubik-bold'>2</Text>
                            </View>
                            <View className='w-1 h-12 bg-primary-200' />
                        </View>
                        <View className='flex-1 pt-1'>
                            <Text className='font-rubik-bold text-black-300 mb-1'>Seu amigo se registra</Text>
                            <Text className='text-xs font-rubik text-black-200'>
                                Ele usa o seu código durante o cadastro
                            </Text>
                        </View>
                    </View>

                    <View className='flex flex-row'>
                        <View className='items-center mr-4'>
                            <View className='w-10 h-10 rounded-full bg-primary-300 items-center justify-center'>
                                <Text className='text-white font-rubik-bold'>3</Text>
                            </View>
                        </View>
                        <View className='flex-1 pt-1'>
                            <Text className='font-rubik-bold text-black-300 mb-1'>Ambos ganham créditos</Text>
                            <Text className='text-xs font-rubik text-black-200'>
                                R$ 50 para você + R$ 50 para seu amigo
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Benefits */}
                <View className='mb-6'>
                    <Text className='text-base font-rubik-bold text-black-300 mb-4'>
                        Benefícios
                    </Text>
                    <BenefitCard
                        title='💰 Sem limite de convites'
                        description='Convide quantos amigos quiser e ganhe créditos infinitos'
                    />
                    <BenefitCard
                        title='⚡ Créditos instantâneos'
                        description='Receba seus R$ 50 assim que seu amigo se registrar'
                    />
                    <BenefitCard
                        title='🎯 Sem taxas'
                        description='Nenhuma taxa ou restrição. Créditos podem ser usados imediatamente'
                    />
                    <BenefitCard
                        title='🏆 Rank de Influenciadores'
                        description='Convide mais amigos e ganhe status especial e rewards extras'
                    />
                </View>

                {/* FAQ Section */}
                <View className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <Text className='text-sm font-rubik-bold text-black-300 mb-3'>
                        Perguntas Frequentes
                    </Text>

                    <Text className='text-xs font-rubik-bold text-black-300 mb-1'>
                        Como recebo os créditos?
                    </Text>
                    <Text className='text-xs font-rubik text-black-200 mb-4'>
                        Os créditos são depositados na sua conta assim que seu amigo completa o primeiro livro de reservas.
                    </Text>

                    <Text className='text-xs font-rubik-bold text-black-300 mb-1'>
                        Posso usar meu código ilimitadamente?
                    </Text>
                    <Text className='text-xs font-rubik text-black-200 mb-4'>
                        Sim! Não há limite de quantas vezes você pode compartilhar seu código.
                    </Text>

                    <Text className='text-xs font-rubik-bold text-black-300 mb-1'>
                        O que acontece com os créditos não utilizados?
                    </Text>
                    <Text className='text-xs font-rubik text-black-200'>
                        Os créditos não expiram e podem ser utilizados em qualquer momento para suas reservas.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Invite;
