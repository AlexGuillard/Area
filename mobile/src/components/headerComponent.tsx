import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

type IconBar = {
  image_url: any;
  onPress: () => void;
};

type HeaderBarProps = {
  page: string;
  left_icon: IconBar[];
};

const HeaderBar = (props: HeaderBarProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.page}</Text>
      <View style={styles.headerIcons}>
        {props.left_icon.map((icon, index) => (
          <TouchableOpacity key={index} onPress={icon.onPress}>
            <Image style={styles.iconItem} source={icon.image_url} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(197, 192, 255, 1)',
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: '10%',
    textDecorationColor: '#2B2277',
    fontSize: 30,
  },
  headerIcons: {
    flexDirection: 'row',
    marginRight: '5%',
  },
  iconItem: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
});

export default HeaderBar;
