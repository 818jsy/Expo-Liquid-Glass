import React, { useRef } from 'react';
import { View, StyleSheet, Button, Text, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LiquidGlass, LiquidGlassView } from 'expo-liquid-glass';
import { findNodeHandle } from 'react-native';

export default function App() {
  const viewRef1 = useRef<View>(null);
  const viewRef2 = useRef<View>(null);

  const handleApplyEffect = async (ref: React.RefObject<View>, index: number) => {
    const viewTag = findNodeHandle(ref.current);
    if (viewTag !== null) {
      try {
        await LiquidGlass.applyEffect(viewTag, {
          blurRadius: 20,
          saturation: 1.2,
          brightness: 1.1,
          noise: 0.1,
        });
        Alert.alert('성공', `View ${index}에 LiquidGlass 효과가 적용되었습니다.`);
      } catch (error: any) {
        Alert.alert('오류', `효과 적용 실패: ${error?.message || '알 수 없는 오류'}`);
        console.error('Failed to apply effect:', error);
      }
    } else {
      Alert.alert('오류', 'View를 찾을 수 없습니다.');
    }
  };

  const handleRemoveEffect = async (ref: React.RefObject<View>, index: number) => {
    const viewTag = findNodeHandle(ref.current);
    if (viewTag !== null) {
      try {
        await LiquidGlass.removeEffect(viewTag);
        Alert.alert('성공', `View ${index}의 효과가 제거되었습니다.`);
      } catch (error: any) {
        Alert.alert('오류', `효과 제거 실패: ${error?.message || '알 수 없는 오류'}`);
        console.error('Failed to remove effect:', error);
      }
    }
  };

  const handleUpdateEffect = async (ref: React.RefObject<View>, index: number) => {
    const viewTag = findNodeHandle(ref.current);
    if (viewTag !== null) {
      try {
        await LiquidGlass.updateEffect(viewTag, {
          blurRadius: 30,
          saturation: 1.5,
          brightness: 1.2,
        });
        Alert.alert('성공', `View ${index}의 효과가 업데이트되었습니다.`);
      } catch (error: any) {
        Alert.alert('오류', `효과 업데이트 실패: ${error?.message || '알 수 없는 오류'}`);
        console.error('Failed to update effect:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="auto" />
      
      <Text style={styles.title}>Expo Liquid Glass 테스트</Text>
      <Text style={styles.subtitle}>Android에서만 동작합니다</Text>

      {/* 방법 1: 프로그래밍 방식으로 효과 적용 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>방법 1: 프로그래밍 방식</Text>
        <View ref={viewRef1} style={styles.targetView}>
          <Text style={styles.viewText}>View 1</Text>
          <Text style={styles.viewSubtext}>버튼으로 효과 제어</Text>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button title="효과 적용" onPress={() => handleApplyEffect(viewRef1, 1)} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="효과 업데이트" onPress={() => handleUpdateEffect(viewRef1, 1)} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="효과 제거" onPress={() => handleRemoveEffect(viewRef1, 1)} />
          </View>
        </View>
      </View>

      {/* 방법 2: LiquidGlassView 컴포넌트 사용 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>방법 2: LiquidGlassView 컴포넌트</Text>
        <LiquidGlassView
          style={styles.liquidGlassView}
          options={{
            blurRadius: 15,
            saturation: 1.3,
            brightness: 1.1,
          }}
        >
          <View style={styles.innerContent}>
            <Text style={styles.viewText}>View 2</Text>
            <Text style={styles.viewSubtext}>자동으로 효과 적용</Text>
          </View>
        </LiquidGlassView>
      </View>

      {/* 방법 3: 두 번째 프로그래밍 방식 예제 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>방법 3: 추가 예제</Text>
        <View ref={viewRef2} style={styles.targetView2}>
          <Text style={styles.viewText}>View 3</Text>
          <Text style={styles.viewSubtext}>다른 설정으로 테스트</Text>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button title="효과 적용" onPress={() => handleApplyEffect(viewRef2, 3)} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="효과 제거" onPress={() => handleRemoveEffect(viewRef2, 3)} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  targetView: {
    width: '100%',
    height: 150,
    backgroundColor: '#6200ee',
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  targetView2: {
    width: '100%',
    height: 150,
    backgroundColor: '#03dac6',
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  liquidGlassView: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContent: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  viewSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    flex: 1,
    minWidth: 100,
  },
});
