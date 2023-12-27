import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

const AddComponent = () => {
  const [nameArea, setNameArea] = useState('');
  const [selectedAction, setSelectedAction] = useState('Action');
  const [selectedReaction, setSelectedReaction] = useState('Reaction');
  const [paramArea, setParamArea] = useState('');
  const [showListAction, setShowListAction] = useState(false);
  const [showListReaction, setShowListReaction] = useState(false);
  const [listAction, setListAction] = useState(['test1', 'test2', 'test3', 'test4']);
  const [listReaction, setListReaction] = useState(['reaction1', 'reaction2', 'reaction3']);

  const handleNameAreaChange = (text) => {
    setNameArea(text);
  };

  const handleClickActionList = () => {
    setShowListAction(!showListAction);
    setShowListReaction(false);
  };

  const handleClickReactionList = () => {
    setShowListReaction(!showListReaction);
    setShowListAction(false);
  };

  const handleActionAreaChange = (item) => {
    setSelectedAction(item);
    setShowListAction(false);
  };

  const handleReactionAreaChange = (item) => {
    setSelectedReaction(item);
    setShowListReaction(false);
  };

  const handleParamAreaChange = (text) => {
    setParamArea(text);
  };

  return (
    <View style={styles.addComponent}>
      <View style={styles.addComponentBody}>
        <Text style={styles.addComponentTitle}>Create Area</Text>
        <TextInput
          style={styles.addComponentNameInput}
          value={nameArea}
          onChangeText={handleNameAreaChange}
          placeholder="Name area"
        />
        <View style={styles.addComponentActionInput}>
          <Text>{selectedAction}</Text>
          <View style={styles.addComponentActionLine} />
          <TouchableOpacity onPress={handleClickActionList}>
            <Image source={require('../../assets/SelectInput.png')} style={styles.addComponentActionButton} />
          </TouchableOpacity>
          {showListAction && (
            <FlatList
              data={listAction}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleActionAreaChange(item)}>
                  <Text style={styles.addComponentActionList}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={styles.addComponentReactionInput}>
          <Text>{selectedReaction}</Text>
          <View style={styles.addComponentReactionLine} />
          <TouchableOpacity onPress={handleClickReactionList}>
            <Image source={require('../../assets/SelectInput.png')} style={styles.addComponentReactionButton} />
          </TouchableOpacity>
          {showListReaction && (
            <FlatList
              data={listReaction}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleReactionAreaChange(item)}>
                  <Text style={styles.addComponentReactionList}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <TextInput
          style={styles.addComponentParamInput}
          value={paramArea}
          onChangeText={handleParamAreaChange}
          placeholder="Reaction parameter"
        />
      </View>
      <TouchableOpacity style={styles.addComponentButton}>
        <Text style={styles.addComponentButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddComponent;

const styles = StyleSheet.create({
  addComponent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addComponentBody: {
    width: 325,
    height: 410,
    backgroundColor: '#C7C4DC',
    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  addComponentTitle: {
    fontSize: 32,
    color: '#000',
    marginTop: 15,
  },
  addComponentNameInput: {
    marginTop: 40,
    height: 50,
    width: 280,
    backgroundColor: '#C5C0FF',
    borderWidth: 2,
    borderColor: '#423B8E',
    borderRadius: 16,
    color: '#2B2277',
    fontSize: 12,
    paddingLeft: 18,
  },
  addComponentActionInput: {
    marginTop: 20,
    width: 300,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#464559',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addComponentActionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
    position: 'absolute',
    left: 260,
  },
  addComponentActionButton: {
    position: 'absolute',
    left: 275,
  },
  addComponentActionList: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: '#000',
  },
  addComponentReactionInput: {
    marginTop: 30,
    width: 300,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#464559',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addComponentReactionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
    position: 'absolute',
    left: 260,
  },
  addComponentReactionButton: {
    position: 'absolute',
    left: 275,
  },
  addComponentReactionList: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: '#000',
  },
  addComponentParamInput: {
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
  addComponentButton: {
    marginTop: 25,
    borderRadius: 16,
    backgroundColor: '#464559',
    alignItems: 'center',
    justifyContent: 'center',
    width: 222,
    height: 47,
  },
  addComponentButtonText: {
    color: '#E4DFF9',
    fontSize: 20,
    fontWeight: '400',
  },
});

