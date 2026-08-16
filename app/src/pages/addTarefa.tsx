import { View, Text, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';



export default function addTarefa({ children }: { children: React.ReactNode }) {
/* 
const router = useRouter(); */

return (
  <Pressable
    onPress={() => router.push('/')} 
    style={{
      position: 'absolute',
      top: 72,
      left: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <MaterialIcons name="arrow-back-ios" size={18} color="#000" />

{/*     <Text
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22,
        color: '#000',
      }}
    >
      Voltar
    </Text> */}
  </Pressable>
);

}