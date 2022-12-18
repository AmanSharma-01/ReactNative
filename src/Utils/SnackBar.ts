import Snackbar from 'react-native-snackbar';

export enum EDuration {
  'Short' = Snackbar.LENGTH_SHORT,
  'Long' = Snackbar.LENGTH_LONG,
  'Indefinite' = Snackbar.LENGTH_INDEFINITE,
}

export default class SnackbarUtil {
  static showSnackbar(
    text: string,
    duration?: EDuration,
    buttonText?: string,
    buttonTextColor?: string,
    backgroundColor?: string,
  ) {
    Snackbar.show({
      text: text,
      duration: duration ? duration : EDuration.Long,
      backgroundColor: !!backgroundColor ? backgroundColor : 'dark gray',
      action: {
        text: !!buttonText ? buttonText : 'Hide',
        textColor: !!buttonTextColor ? buttonTextColor : 'green',
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  }
  static hideSnackbar() {
    Snackbar.dismiss();
  }
}