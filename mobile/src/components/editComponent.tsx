import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
interface editProps {
  name: string;
}

function EditComponent(props: editProps) {
  const [nameArea, setNameArea] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<string>("Action");
  const [selectedReaction, setSelectedReaction] = useState<string>("Reaction");
  const [paramArea, setParamArea] = useState<string>("");
  const [showListAction, setShowListAction] = useState<boolean>(false);
  const [showListReaction, setShowListReaction] = useState<boolean>(false);
  const [listAction, setListAction] = useState<string[]>([]);
  const [listReaction, setListReaction] = useState<string[]>([]);

  const handleNameAreaChange = (text: string) => {
    setNameArea(text);
  };

  const handleActionAreaChange = (itemValue: string) => {
    setSelectedAction(itemValue);
    setShowListAction(false);
  };

  const handleReactionAreaChange = (itemValue: string) => {
    setSelectedReaction(itemValue);
    setShowListReaction(false);
  };

  const handleParamAreaChange = (text: string) => {
    setParamArea(text);
  };

  const renderItem = (item: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    setNameArea(props.name);
    setListAction(["test1", "test2", "test3", "test4", "aaaaaaaaa"]);
    setListReaction(["test1", "test2"]);
  }, [props.name]);

  return (
    <View style={styles.editComponent}>
      <View style={styles.editComponentBody}>
        <Text style={styles.editComponentTitle}>Edit Area</Text>
        <TextInput
          style={styles.editComponentNameInput}
          value={nameArea}
          onChangeText={handleNameAreaChange}
          placeholder="Name area"
        />
        <View style={styles.editComponentActionInput}>
          <Text>{selectedAction}</Text>
          <View style={styles.editComponentActionLine} />
          <TouchableOpacity onPress={() => setShowListAction(!showListAction)}>
            <Image source={require('../../assets/SelectInput.png')} style={styles.editComponentActionButton} />
          </TouchableOpacity>
          {showListAction && (
            <FlatList
              data={listAction}
              renderItem={({ item }) =>
                renderItem(item, () => handleActionAreaChange(item))
              }
              keyExtractor={(item) => item}
            />
          )}
        </View>
        <View style={styles.editComponentReactionInput}>
          <Text>{selectedReaction}</Text>
          <View style={styles.editComponentReactionLine} />
          <TouchableOpacity onPress={() => setShowListReaction(!showListReaction)}>
            <Image source={require('../../assets/SelectInput.png')} style={styles.editComponentReactionButton} />
          </TouchableOpacity>
          {showListReaction && (
            <FlatList
              data={listReaction}
              renderItem={({ item }) =>
                renderItem(item, () => handleReactionAreaChange(item))
              }
              keyExtractor={(item) => item}
            />
          )}
        </View>
        <TextInput
          style={styles.editComponentParamInput}
          value={paramArea}
          onChangeText={handleParamAreaChange}
          placeholder="Reaction parameter"
        />
      </View>
      <TouchableOpacity style={styles.editComponentButton}>
        <Text style={styles.editComponentButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  editComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editComponentBody: {
    width: 325,
    height: 410,
    backgroundColor: '#C7C4DC',
    borderRadius: 16,
    alignItems: 'center',
  },
  editComponentTitle: {
    fontSize: 32,
    color: '#000',
    marginTop: 15,
  },
  editComponentNameInput: {
      marginTop: 40,
      height: 50,
      width: 280,
      backgroundColor: '#C5C0FF',
      borderColor: '#423B8E',
      borderWidth: 2,
      borderRadius: 16,
      color: '#2B2277',
      fontSize: 12,
      paddingLeft: 18,
  },
  editComponentActionInput: {
      marginTop: 20,
      width: 300,
      height: 62,
      borderRadius: 16,
      backgroundColor: '#464559',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  editComponentActionLine: {
      width: 1,
      height: 62,
      backgroundColor: '#000',
      position: 'absolute',
      left: 260,
  },
  editComponentActionButton: {
      position: 'absolute',
      left: 275,
  },
  editComponentActionListArea: {
      position: 'absolute',
      backgroundColor: 'var(--secondary-container)',
      top: 154,
      width: '46%',
      borderWidth: 1,
      borderColor: '#000',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderTopLeftRadius: 0,
      paddingTop: 10,
      paddingBottom: 20,
  },
  editComponentActionList: {
      marginTop: 10,
  },
  editComponentReactionInput: {
      marginTop: 30,
      width: 300,
      height: 62,
      borderRadius: 16,
      backgroundColor: '#464559',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  editComponentReactionLine: {
      width: 1,
      height: 62,
      backgroundColor: '#000',
      position: 'absolute',
      left: 260,
  },
  editComponentReactionButton: {
      position: 'absolute',
      left: 275,
  },
  editComponentReactionListArea: {
      position: 'absolute',
      backgroundColor: 'var(--secondary-container)',
      top: 246,
      width: '46%',
      borderWidth: 1,
      borderColor: '#000',
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderTopLeftRadius: 0,
      paddingTop: 10,
      paddingBottom: 20,
  },
  editComponentReactionList: {
      marginTop: 10,
  },
  editComponentParamInput: {
      marginTop: 15,
      height: 44,
      width: 262,
      backgroundColor: '#C5C0FF',
      borderWidth: 2,
      borderColor: '#423B8E',
      borderRadius: 16,
      color: '#2B2277',
      fontSize: 12,
      paddingLeft: 18,
  },
  editComponentButton: {
      marginTop: 25,
      borderRadius: 16,
      backgroundColor: '#464559',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 222,
      height: 47,
  },
  editComponentButtonText: {
      color: '#E4DFF9',
      fontSize: 20,
      fontWeight: '400',
  }
})

export default EditComponent;
