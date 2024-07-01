import { Button, Text } from '@rneui/themed';

export type CustomButtonProps = {
    buttonText: string;
    mode: string;
};

export function CustomButton(props : CustomButtonProps) {
    let lightColor = "#4dabf7";
    let darkColor = "#9775fa";
    return (
        <Button title={props.buttonText} buttonStyle={{
            backgroundColor: props.mode === "day"? lightColor : darkColor,
            borderRadius: 20,
            width: '50%',
            alignSelf: 'center',
            marginTop: 20
          }}></Button>
    );
}