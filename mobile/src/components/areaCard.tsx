import {Avatar} from 'react-native-elements';
import {View, StyleSheet, Text, StatusBar, Pressable} from 'react-native';

type AreaCardProps = {
  title: string;
  image_url: string;
  on_press: () => void;
};

const AreaCard = (props: AreaCardProps) => {
  return (
    <View>
      <Pressable style={styles.card} onPress={props.on_press}>
        <Avatar rounded size="medium" source={{uri: props.image_url}} />
        <Text style={styles.cardText}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'space-evenly',
  },
  card: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    padding: 10,
    backgroundColor: 'rgba(199, 196, 220, 1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  cardText: {
    paddingLeft: 50,
    paddingVertical: 10,
    color: '#000',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
});

export default AreaCard;
