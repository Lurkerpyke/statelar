import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SectionProps {
    title: string;
    isOpen: boolean;
    onPress: () => void;
    children: React.ReactNode;
}

const CollapsibleSection = ({ title, isOpen, onPress, children }: SectionProps) => (
    <View className='mb-4 border border-primary-200 rounded-lg overflow-hidden'>
        <TouchableOpacity
            onPress={onPress}
            className='flex flex-row items-center justify-between bg-primary-100 px-4 py-4'
        >
            <Text className='text-base font-rubik-bold text-black-300'>{title}</Text>
            <Image
                source={icons.rightArrow}
                className={`size-5 transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
            />
        </TouchableOpacity>

        {isOpen && (
            <View className='px-4 py-4 bg-white'>
                {children}
            </View>
        )}
    </View>
);

const Security = () => {
    const router = useRouter();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        encryption: true,
        privacy: false,
        dataHandling: false,
        authentication: false,
        compliance: false,
        support: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                {/* Header */}
                <View className='flex flex-row items-center justify-between mt-5 mb-5'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={icons.backArrow} className='size-6' />
                    </TouchableOpacity>
                    <Text className='text-xl font-rubik-bold flex-1 text-center'>Segurança & Privacidade</Text>
                    <View className='w-6' />
                </View>

                {/* Introduction */}
                <View className='mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200'>
                    <Text className='text-sm font-rubik-medium text-black-300 leading-6'>
                        Sua segurança e privacidade são nossa prioridade máxima. Esta página explica como protegemos seus dados e como você pode manter sua conta segura.
                    </Text>
                </View>

                {/* Encryption Section */}
                <CollapsibleSection
                    title='🔐 Encriptação & Proteção de Dados'
                    isOpen={expandedSections.encryption}
                    onPress={() => toggleSection('encryption')}
                >
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-3'>
                        <Text className='font-rubik-bold'>Encriptação End-to-End</Text>
                        {'\n'}Todos os seus dados pessoais e de pagamento são encriptados com padrão AES-256, garantindo que apenas você possa acessar suas informações.
                    </Text>

                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-3'>
                        <Text className='font-rubik-bold'>Conexão Segura</Text>
                        {'\n'}Utilizamos certificados SSL/TLS para garantir que todas as conexões com nossos servidores sejam seguras e protegidas contra interceptações.
                    </Text>

                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        <Text className='font-rubik-bold'>Backup Automático</Text>
                        {'\n'}Seus dados são automaticamente sincronizados e armazenados em servidores seguros com redundância geográfica para proteção contra perda de dados.
                    </Text>
                </CollapsibleSection>

                {/* Privacy Section */}
                <CollapsibleSection
                    title='👁️ Política de Privacidade'
                    isOpen={expandedSections.privacy}
                    onPress={() => toggleSection('privacy')}
                >
                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>O que coletamos</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        • Informações de perfil (nome, email, avatar){'\n'}
                        • Histórico de reservas e transações{'\n'}
                        • Dados de localização (apenas quando autorizado){'\n'}
                        • Dados de dispositivo e navegação do app
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Como usamos seus dados</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        • Fornecer e melhorar nossos serviços{'\n'}
                        • Personalizar sua experiência{'\n'}
                        • Processar pagamentos com segurança{'\n'}
                        • Comunicar importantes atualizações{'\n'}
                        • Detectar e prevenir fraudes
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Compartilhamento de dados</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        Nunca vendemos seus dados. Compartilhamos informações apenas com parceiros confiáveis para processar transações (processadores de pagamento, provedores de hospedagem).
                    </Text>
                </CollapsibleSection>

                {/* Data Handling Section */}
                <CollapsibleSection
                    title='📊 Tratamento de Dados'
                    isOpen={expandedSections.dataHandling}
                    onPress={() => toggleSection('dataHandling')}
                >
                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Retenção de dados</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        Retemos seus dados enquanto sua conta estiver ativa. Você pode solicitar a exclusão de sua conta a qualquer momento, e seus dados serão permanentemente removidos em até 30 dias.
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Direitos do usuário</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        Você tem o direito de:{'\n'}
                        • Acessar todos seus dados pessoais{'\n'}
                        • Corrigir informações imprecisas{'\n'}
                        • Deletar sua conta a qualquer momento{'\n'}
                        • Solicitar relatório de dados (LGPD/GDPR)
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Conformidade</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        Estamos em conformidade com LGPD (Brasil), GDPR (Europa) e outras regulamentações de proteção de dados internacionais.
                    </Text>
                </CollapsibleSection>

                {/* Authentication Section */}
                <CollapsibleSection
                    title='🔑 Autenticação & Conta'
                    isOpen={expandedSections.authentication}
                    onPress={() => toggleSection('authentication')}
                >
                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Dicas de segurança</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        • Use uma senha forte e única{'\n'}
                        • Ative autenticação de dois fatores{'\n'}
                        • Não compartilhe suas credenciais{'\n'}
                        • Verifique a URL antes de login{'\n'}
                        • Logout em dispositivos compartilhados
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Autenticação Multi-Fator (2FA)</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        Oferecemos autenticação de dois fatores via SMS e aplicativos autenticadores para proteção adicional de sua conta.
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Sessões de segurança</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        Você pode visualizar e gerenciar todas as sessões ativas de sua conta. Faça logout em dispositivos não reconhecidos na seção "Sessões Ativas".
                    </Text>
                </CollapsibleSection>

                {/* Compliance Section */}
                <CollapsibleSection
                    title='✅ Conformidade & Certificações'
                    isOpen={expandedSections.compliance}
                    onPress={() => toggleSection('compliance')}
                >
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-3'>
                        <Text className='font-rubik-bold'>ISO 27001</Text>
                        {'\n'}Sistema de Gerenciamento de Segurança da Informação
                    </Text>

                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-3'>
                        <Text className='font-rubik-bold'>SOC 2 Type II</Text>
                        {'\n'}Auditoria independente de segurança, disponibilidade e confidencialidade
                    </Text>

                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-3'>
                        <Text className='font-rubik-bold'>LGPD Compliant</Text>
                        {'\n'}Atendemos todos os requisitos da Lei Geral de Proteção de Dados do Brasil
                    </Text>

                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        <Text className='font-rubik-bold'>GDPR Compliant</Text>
                        {'\n'}Cumprimos regulamentos de proteção de dados da União Europeia
                    </Text>
                </CollapsibleSection>

                {/* Support Section */}
                <CollapsibleSection
                    title='📧 Suporte & Denúncias'
                    isOpen={expandedSections.support}
                    onPress={() => toggleSection('support')}
                >
                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Reportar problemas de segurança</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        Se descobrir uma vulnerabilidade, entre em contato com nosso time de segurança:{'\n\n'}
                        <Text className='font-rubik-bold'>security@statelar.com</Text>
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Contato geral de suporte</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6 mb-4'>
                        <Text className='font-rubik-bold'>support@statelar.com</Text>{'\n'}
                        Atendimento 24/7 disponível em português, inglês e espanhol.
                    </Text>

                    <Text className='text-sm font-rubik-bold text-black-300 mb-2'>Últimas atualizações de segurança</Text>
                    <Text className='text-sm font-rubik text-black-300 leading-6'>
                        Última atualização: Janeiro 2026{'\n'}
                        Próxima auditoria: Junho 2026
                    </Text>
                </CollapsibleSection>

                {/* Footer */}
                <View className='mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <Text className='text-xs font-rubik text-black-300 text-center'>
                        Esta página é informativa e baseada em práticas de segurança recomendadas. Para informações legais completas, consulte nossos Termos de Serviço e Política de Privacidade.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Security;