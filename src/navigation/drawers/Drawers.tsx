import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Tabs from '../bottom-tabs/Tabs';
import {ITheme, useTheme} from '../../contexts';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import SignUpBtn from '../../components/Home/SignUpBtn';
import drawerStyle from '../../styles/DrawerStyles';
import {drawerItems} from './DrawerItems';
import {useState} from 'react';
import CustomizeModal from '../../components/Tabs/CustomizeModal';
import SignInModal from '../../components/Login/SignInModal';
import {
  closeModal,
  getFeeds,
  IAuth,
  setFilter,
  signOut,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {useAuth} from '../../hooks';
import GearIcon from '../../icons/Gear';
import Modal from 'react-native-modal';
import UserIcon from '../../icons/UserIcon';
import LogoutIcon from '../../icons/Logout';
import ProfileStack from '../stacks/ProfileNavigationContainer';
import {TDispatch} from '../../common';
import ReadingHistory from '../../screens/ReadingHistory/ReadingHistory';

const DrawerItems: {name: string; component: any}[] = [
  {
    name: 'Tabs',
    component: Tabs,
  },
  {
    name: 'ReadingHistory',
    component: ReadingHistory,
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
  },
];

type TMenuItem = {
  name: string;
  icon: any;
  onPress?: any;
};

const Drawer = createDrawerNavigator();

function settingsMenuItems(
  color: string,
  navigation: any,
  dispatch: TDispatch,
  token: string,
) {
  const menus: TMenuItem[] = [
    {
      name: 'Profile',
      icon: <UserIcon fill={color} />,
      onPress: () => navigation.navigate('ProfileStack'),
    },
    {
      name: 'Account details',
      icon: <GearIcon fill={color} />,
      onPress: () =>
        navigation.navigate('ProfileStack', {
          screen: 'AccountSettingsStack',
          params: {
            screen: 'EditProfile',
          },
        }),
    },
    {
      name: 'Logout',
      icon: <LogoutIcon fill={color} />,
      onPress: () => {
        setFilter(null);
        navigation.navigate('Home');
        setTimeout(() => {
          dispatch(signOut(token));
          dispatch(getFeeds({}));
          dispatch(closeModal());
        }, 500);
      },
    },
  ];
  return menus;
}

const SettingsModal = ({
  isSettingsModalOpen,
  setSettingsModal,
  theme,
  navigation,
}: {
  isSettingsModalOpen: boolean;
  setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ITheme;
  navigation: any;
}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAuth();
  const menus = settingsMenuItems(
    theme.theme.colors.labelTertiary,
    navigation,
    dispatch,
    auth?.tokens.access.token || '',
  );
  return (
    <Modal
      isVisible={isSettingsModalOpen}
      animationIn={'tada'}
      animationOut={'tada'}
      style={drawerStyle(theme).settingsModal}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setSettingsModal(false);
      }}>
      <View style={drawerStyle(theme).settingsMenu}>
        {menus.map((item, i) => (
          <TouchableOpacity
            onPress={() => {
              setSettingsModal(false);
              item.onPress();
            }}
            style={drawerStyle(theme).settingsModalItem}
            key={i}>
            {item.icon}
            <Text style={{color: theme.theme.colors.labelTertiary}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const ProfileSection = ({
  auth,
  theme,
  navigation,
}: {
  auth: IAuth | null;
  theme: ITheme;
  navigation: any;
}) => {
  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  return (
    <View style={drawerStyle(theme).profileSection}>
      <View style={drawerStyle(theme).row}>
        <TouchableOpacity
          style={drawerStyle(theme).profileButton}
          onPress={() => navigation.navigate('ProfileStack')}>
          {auth?.user.avatar && (
            <Image
              style={drawerStyle(theme).profilePicture}
              source={{uri: auth.user.avatar}}
            />
          )}
          <Text style={drawerStyle(theme).profileButtonText}>
            {auth?.user.readingStreak}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSettingsModal(true)}>
          <GearIcon
            fill={theme.theme.colors.labelTertiary}
            width={30}
            height={30}
          />
        </TouchableOpacity>
        <SettingsModal
          theme={theme}
          isSettingsModalOpen={isSettingsModalOpen}
          setSettingsModal={setSettingsModal}
          navigation={navigation}
        />
      </View>
      <Text style={{color: theme.theme.colors.labelSecondary}}>
        @{auth?.user.username}
      </Text>
    </View>
  );
};

function CustomDrawerContent(props) {
  const theme = useTheme();
  const [customizeIsOpen, setIsOpen] = useState(false);
  const {auth} = useAuth();
  const dispatch = useAppDispatch();
  const isAuthenticated = !!auth?.tokens.access.token;
  const {isOpen} = useAppSelector(state => state.signInModal);
  const items = drawerItems(
    theme.theme.colors.labelTertiary,
    setIsOpen,
    props.navigation,
    dispatch,
    isAuthenticated,
    auth?.user.avatar,
    auth?.tokens.access.token,
  );
  return (
    <DrawerContentScrollView {...props}>
      <SignInModal modalVisible={isOpen} />
      <CustomizeModal
        modalVisible={customizeIsOpen}
        setModalVisible={setIsOpen}
      />
      {!isAuthenticated ? (
        <View style={drawerStyle(theme).headerContainer}>
          <SignUpBtn />
        </View>
      ) : (
        <ProfileSection
          auth={auth}
          theme={theme}
          navigation={props.navigation}
        />
      )}
      <View style={drawerStyle(theme).drawerItemContainer}>
        {items.map((item, i) => (
          <DrawerItem
            key={i}
            label={item.name}
            icon={item.icon}
            onPress={
              item.onPress ||
              function (): void {
                throw new Error('Function not implemented.');
              }
            }
            labelStyle={{
              color: theme.theme.colors.labelTertiary,
            }}
            style={drawerStyle(theme).drawerItem}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

export default function Drawers() {
  const theme = useTheme();
  /* const customBtn = (props: {
    tintColor?: string | undefined;
    pressColor?: string | undefined;
    pressOpacity?: number | undefined;
    labelVisible?: boolean | undefined;
  }) => {
    console.log(props.tintColor || theme.theme.colors.labelTertiary);
    const navigate = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => navigate.openDrawer()}
        style={HomesStyles.HambergerBtnContainer}>
        <Hamburger fill={props.tintColor} height={30} width={30} />
      </TouchableOpacity>
    );
  }; */

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.theme.colors.backgroundPrimary,
          width: 280,
        },
        drawerType: 'front',

        /*  headerStyle: {
          ...HomesStyles.header,
          backgroundColor: theme.theme.colors.backgroundPrimary,
        },
        headerTitleStyle: {color: theme.theme.colors.labelTertiary},
        headerTitleAlign: 'center',
        headerLeft: () =>
          customBtn({tintColor: theme.theme.colors.labelTertiary}), */
      }}>
      {DrawerItems.map(drawer => (
        <Drawer.Screen
          name={drawer.name}
          component={drawer.component}
          key={drawer.name}
          options={{headerShown: false}}
        />
      ))}
    </Drawer.Navigator>
  );
}
