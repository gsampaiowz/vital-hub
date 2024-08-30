import { useState } from 'react';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Text, StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 32 },
    codeFieldRoot: { marginTop: 0, flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
    cell: {
        width: 80,
        height: 60,
        lineHeight: 38,
        fontSize: 32,
        borderWidth: 2,
        paddingTop: 10,
        color: '#34898F',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#77CACF',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#77CACF',
        color: '#000'
    },
});

const CELL_COUNT = 4;


const CodeInput = ({value, setValue}) => {
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })

    return (
        <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            
            textContentType="oneTimeCode"
            autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                    
                </Text>
            )}
        />
    )

}

export default CodeInput;