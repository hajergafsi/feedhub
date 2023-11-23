import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import CustomModal from '../Common/CustomModal';
import {
  EAuthErrors,
  forgotPassword,
  signIn,
  signUp,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {closeModal, openModal} from '../../store/slices';
import {btnStyles} from './SignInBtn';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import CountryPicker, {
  CallingCode,
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import RightArrowIcon from '../../icons/RightArrow';
import LockIcon from '../../icons/Lock';
import EyeIcon from '../../icons/Eye';
import AtIcon from '../../icons/AtIcon';
import KeyIcon from '../../icons/KeyIcon';
import {resetPassword} from '../../store/thunks/auth/resetPassword';

type Props = {
  modalVisible: boolean;
};

const loginValidationSchema = yup.object().shape({
  phone: yup.string().required('Phone number is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const registerValidationSchema = yup.object().shape({
  phone: yup.string().required('Phone number is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  username: yup.string().required('Username is required'),
});

const VerificationCodeFormValidation = yup.object().shape({
  code: yup
    .string()
    .required('Code is required')
    .min(6, ({min}) => `Code must be ${min} characters`)
    .max(6, ({max}) => `Code must be ${max} characters`),
});

const ResetPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({min}) => `Password must be at least ${min} characters`),
});

type TAction = 'Sign up' | 'Sign in';

const SignInModal = ({modalVisible}: Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const setModalVisible = (state: boolean) => {
    dispatch(state ? openModal() : closeModal());
  };
  const [step, setStep] = useState<number>(1);
  const [action, setAction] = useState<TAction>('Sign up');
  const [countryCode, setCountryCode] = useState<CountryCode>('TR');
  const [countryCallingCode, setCallingCode] = useState<CallingCode>('90');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phoneForVerif, setPhoneForVerif] = useState<string>('');
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const {isOpen} = useAppSelector(state => state.signInModal);
  const {error} = useAppSelector(state => state.auth);
  useEffect(() => {
    if (!isOpen) setStep(1);
  }, [isOpen]);
  // Attach this to your <Formik>
  const formRef =
    useRef<FormikProps<{phone: string; password: string; username: string}>>();

  const handleSubmitRegister = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const Footer = (
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: theme.theme.colors.labelTertiary}}>
        {action === 'Sign in'
          ? "Don't have an account?  "
          : 'Already have an account? '}
      </Text>
      <Pressable
        onPress={() => setAction(action === 'Sign in' ? 'Sign up' : 'Sign in')}>
        <Text style={styles(theme).underlinedText}>
          {action === 'Sign in' ? 'Sign up ' : 'log in'}
        </Text>
      </Pressable>
    </View>
  );

  const goBackButton = (
    <TouchableOpacity
      onPress={() => {
        setStep(st => st - 1);
      }}
      style={[styles(theme).sumbitBtn, styles(theme).rotateInverse]}>
      <RightArrowIcon fill={theme.theme.colors.labelTertiary} />
    </TouchableOpacity>
  );

  const SignInBody = (
    <View style={styles(theme).body}>
      {step > 2 ? (
        <VerificationCodeForm
          step={step}
          setStep={setStep}
          phone={phoneForVerif}
        />
      ) : (
        <Formik
          innerRef={formRef}
          initialValues={{phone: '', password: '', username: ''}}
          validationSchema={
            action === 'Sign in'
              ? loginValidationSchema
              : registerValidationSchema
          }
          onSubmit={values => {
            dispatch(
              action === 'Sign in'
                ? signIn({
                    phone: '+' + countryCallingCode + values.phone,
                    password: values.password,
                  })
                : signUp({
                    phone: '+' + countryCallingCode + values.phone,
                    password: values.password,
                    username: values.username,
                  }),
            );
            //dispatch(closeModal());
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            touched,
            errors,
          }) => (
            <>
              {step === 2 && action === 'Sign in' && (
                <View>
                  <Text style={styles(theme).forgotPasswordTopText}>
                    Enter the phone number you registered with and we will send
                    you a verification code.
                  </Text>
                </View>
              )}
              <View style={styles(theme).inputContainer}>
                <CountryPicker
                  {...{
                    countryCode,
                    onSelect,
                    withCallingCode: true,
                    withCallingCodeButton: true,
                    withFilter: true,
                    theme: {
                      onBackgroundTextColor: theme.theme.colors.labelPrimary,
                      backgroundColor: theme.theme.colors.backgroundPrimary,
                    },
                  }}
                />
                <View
                  /* behavior="height" */
                  style={[styles(theme).spacing, {flex: 1}]}>
                  <TextInput
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType={'numeric'}
                    placeholder={'xx xxx xxxx'}
                    placeholderTextColor={theme.theme.colors.labelTertiary}
                    style={{
                      color: theme.theme.colors.labelPrimary,
                      fontSize: 16,
                    }}
                  />
                  {action === 'Sign up' && step === 1 && (
                    <TouchableOpacity
                      disabled={!values.phone}
                      style={[
                        styles(theme).sumbitBtn,
                        values.phone
                          ? {
                              backgroundColor: theme.theme.colors.labelPrimary,
                            }
                          : null,
                      ]}
                      onPress={() => setStep(2)}>
                      <RightArrowIcon
                        fill={
                          values.phone
                            ? theme.theme.colors.labelInvert
                            : theme.theme.colors.labelTertiary
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {errors.phone && touched.phone && (
                <Text style={styles(theme).errorText}>{errors.phone}</Text>
              )}
              {(action === 'Sign in' || step === 2) && (
                <>
                  {(action === 'Sign up' || step === 1) && (
                    <>
                      <View style={styles(theme).inputContainer}>
                        <LockIcon fill={theme.theme.colors.labelTertiary} />
                        <View style={[styles(theme).spacing, {width: '87%'}]}>
                          <TextInput
                            secureTextEntry={!showPassword}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            textContentType={'password'}
                            placeholder={'Password'}
                            placeholderTextColor={
                              theme.theme.colors.labelTertiary
                            }
                            style={{
                              color: theme.theme.colors.labelPrimary,
                              fontSize: 16,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}>
                            <EyeIcon fill={theme.theme.colors.labelTertiary} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      {errors.password && touched.password && (
                        <Text style={styles(theme).errorText}>
                          {errors.password}
                        </Text>
                      )}
                    </>
                  )}
                  {step === 1 ? (
                    <KeyboardAvoidingView
                      style={[styles(theme).row, {marginTop: 150}]}>
                      <Pressable onPress={() => setStep(2)}>
                        <Text style={styles(theme).underlinedText}>
                          Forgot password?
                        </Text>
                      </Pressable>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={!isValid}
                        style={[
                          btnStyles(theme, theme.theme.colors.colorCabbage)
                            .btnContainer,
                          styles(theme).loginBtn,
                        ]}>
                        <Text style={styles(theme).buttonText}>Log in</Text>
                      </TouchableOpacity>
                    </KeyboardAvoidingView>
                  ) : action === 'Sign in' ? (
                    <TouchableOpacity
                      onPress={() => {
                        setPhoneForVerif(
                          '+' + countryCallingCode + values.phone,
                        );
                        dispatch(
                          forgotPassword({
                            phone: '+' + countryCallingCode + values.phone,
                          }),
                        );
                        setTimeout(() => {
                          if (error?.message !== EAuthErrors.FORGOT_PASSWORD)
                            setStep(3);
                        }, 2000);
                      }}
                      disabled={!values.phone}
                      style={[
                        btnStyles(theme, theme.theme.colors.colorCabbage)
                          .btnContainer,
                        styles(theme).loginBtn,
                        {width: '100%', marginTop: 30},
                      ]}>
                      <Text style={styles(theme).buttonText}>
                        Send verification code
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <View style={styles(theme).inputContainer}>
                        <AtIcon fill={theme.theme.colors.labelTertiary} />
                        <TextInput
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          placeholder={'Username'}
                          placeholderTextColor={
                            theme.theme.colors.labelTertiary
                          }
                          style={{
                            color: theme.theme.colors.labelPrimary,
                            fontSize: 16,
                            width: '100%',
                          }}
                        />
                      </View>
                      {errors.username && touched.username && (
                        <Text style={styles(theme).errorText}>
                          {errors.username}
                        </Text>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Formik>
      )}
    </View>
  );

  const SignUpButton = (
    <TouchableOpacity
      onPress={handleSubmitRegister}
      /* disabled={!formRef.current?.isValid} */
      style={[
        btnStyles(theme, theme.theme.colors.colorCabbage).btnContainer,
        styles(theme).loginBtn,
        {width: '87%'},
      ]}>
      <Text style={styles(theme).buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );

  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      children={SignInBody}
      Header={
        step > 2
          ? step > 3
            ? 'Reset password'
            : 'Verification'
          : action + ' to FeedHub'
      }
      Footer={
        step === 1 ? Footer : action === 'Sign up' ? SignUpButton : undefined
      }
      HeaderLeft={step > 1 ? goBackButton : null}
    />
  );
};

const VerificationCodeForm = ({
  step,
  setStep,
  phone,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  phone: string;
}) => {
  const theme = useTheme();
  const [remainingTime, setRemainingTime] = useState(120);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0)
        setRemainingTime(remainingTime => remainingTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  return (
    <View>
      <Text style={styles(theme).verificationTopText}>
        {step === 3
          ? `We just sent the verification code to ${phone}`
          : 'Enter your new password'}
      </Text>
      <Formik
        initialValues={{code: '', password: ''}}
        validationSchema={
          step === 3 ? VerificationCodeFormValidation : ResetPasswordValidation
        }
        onSubmit={values => {
          setStep(4);
          //console.log(values);
          if (step === 4)
            dispatch(
              resetPassword({
                phone: phone,
                code: values.code,
                newPassword: values.password,
              }),
            );
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {step === 3 ? (
              <>
                <View
                  style={[
                    styles(theme).inputContainer,
                    styles(theme).codeInputContainer,
                  ]}>
                  <KeyIcon fill={theme.theme.colors.labelTertiary} />
                  <TextInput
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    value={values.code}
                    placeholder={'Code'}
                    placeholderTextColor={theme.theme.colors.labelTertiary}
                    style={{
                      color: theme.theme.colors.labelPrimary,
                      fontSize: 16,
                      width: '80%',
                    }}
                  />
                </View>
                {touched.code && errors.code && (
                  <Text style={styles(theme).errorText}>{errors.code}</Text>
                )}
              </>
            ) : (
              <>
                <View style={styles(theme).inputContainer}>
                  <LockIcon fill={theme.theme.colors.labelTertiary} />
                  <View style={[styles(theme).spacing, {width: '87%'}]}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      textContentType={'password'}
                      placeholder={'Password'}
                      placeholderTextColor={theme.theme.colors.labelTertiary}
                      style={{
                        color: theme.theme.colors.labelPrimary,
                        fontSize: 16,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}>
                      <EyeIcon fill={theme.theme.colors.labelTertiary} />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles(theme).errorText}>{errors.password}</Text>
                )}
              </>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                btnStyles(theme, theme.theme.colors.colorCabbage).btnContainer,
                styles(theme).loginBtn,
                styles(theme).verifyBtn,
              ]}>
              <Text style={styles(theme).buttonText}>
                {step === 3 ? 'Verify' : 'Change password'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {step === 3 && (
        <TouchableOpacity
          disabled={remainingTime > 0}
          onPress={() => setRemainingTime(120)}
          style={[
            btnStyles(theme, theme.theme.colors.colorCabbage).btnContainer,
            styles(theme).sendCodeBtn,
          ]}>
          <Text style={styles(theme).sendCodeBtnText}>
            {remainingTime ? formatTime(remainingTime) : 'Resend'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SignInModal;

const styles = (theme: ITheme) =>
  StyleSheet.create({
    body: {
      alignItems: 'center',
    },
    orContainer: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    horizontalLine: {
      height: 1,
      width: '45%',
      backgroundColor: theme.theme.colors.dividerTertiary,
    },
    underlinedText: {
      textDecorationColor: theme.theme.colors.labelPrimary,
      textDecorationLine: 'underline',
      color: theme.theme.colors.labelPrimary,
    },
    inputContainer: {
      backgroundColor: theme.theme.colors.float,
      width: '100%',
      height: 43,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginTop: 20,
    },
    codeInputContainer: {
      justifyContent: 'center',
      width: '75%',
      alignSelf: 'center',
    },
    sumbitBtn: {
      width: 30,
      height: 30,
      backgroundColor: theme.theme.colors.active,
      borderRadius: 8,
      transform: [{rotate: '90deg'}],
    },
    rotateInverse: {
      transform: [{rotate: '-90deg'}],
    },
    spacing: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '73%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '20%',
    },
    loginBtn: {width: '50%', justifyContent: 'center', marginBottom: 0},
    buttonText: {
      fontWeight: '700',
      fontSize: 17,
      color: '#fff',
    },
    forgotPasswordTopText: {
      color: theme.theme.colors.labelSecondary,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    errorText: {
      color: theme.theme.colors.labelQuaternary,
      textAlign: 'left',
      width: '96%',
      marginTop: 7,
    },
    verificationTopText: {
      fontSize: 17,
      color: theme.theme.colors.labelSecondary,
      textAlign: 'center',
    },
    verifyBtn: {
      marginTop: 20,
      alignSelf: 'center',
      width: '75%',
    },
    sendCodeBtn: {
      backgroundColor: 'transparent',
      width: 90,
      height: 40,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.theme.colors.labelPrimary,
      alignSelf: 'center',
      marginTop: 20,
    },
    sendCodeBtnText: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
  });
