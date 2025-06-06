import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CollapsibleProps extends PropsWithChildren {
  title: string;
  style?: ViewStyle;
}

/**
 * Collapsible
 * Componente de seção expansível/retrátil.
 * Mostra um título e um ícone de seta. Ao clicar, expande ou retrai o conteúdo.
 * Usa tema claro/escuro e permite estilização externa via prop `style`.
 */
export function Collapsible({ children, title, style }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={style}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityLabel={`Expandir ou retrair seção ${title}`}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8, // Adiciona área de toque maior para acessibilidade
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
