import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  FlatList,
} from 'react-native';
interface editProps {
  name: string;
  nameAction: string;
  nameReaction: string;
}
import axios from 'axios';
import {useAuth} from '../context/UserContext';

function EditComponent(props: editProps) {
  interface AreaItem {
    nameArea: string;
    nameAction: string;
    actionParameter: any;
    nameReaction: string;
    reactionParameter: any;
  }

  interface ParamItem {
    nameParam: string;
    typeParam: string;
    param: any;
  }

  const [infoArea, setInfoArea] = useState<AreaItem | null>(null);

  const [nameArea, setNameArea] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedReaction, setSelectedReaction] = useState('');

  const [showlistAction, setShowListAction] = useState(false);
  const [showlistReaction, setShowListReaction] = useState(false);

  const [listAction, setListAction] = useState<string[]>();
  const [listReaction, setListReaction] = useState<string[]>();

  const [listParamAction, setListParamAction] = useState<ParamItem[]>([]);
  const [listParamReaction, setListParamReaction] = useState<ParamItem[]>([]);

  const [modelParamAction, setModelParamAction] = useState<any>([]);
  const [modelParamReaction, setModelParamReaction] = useState<any>([]);

  const [paramAction, setParamAction] = useState<any>([]);
  const [paramReaction, setParamReaction] = useState<any>([]);

  const {token} = useAuth();

  const handleNameAreaChange = (text: string) => {
    setNameArea(text);
  };

  const handleClickActionList = () => {
    setShowListAction(!showlistAction);
    setShowListReaction(false);
  };

  const handleClickReactionList = () => {
    setShowListReaction(!showlistReaction);
    setShowListAction(false);
  };

  const handleActionAreaChange = async (event: string) => {
    setSelectedAction(event);
    setListParamAction([]);
    setParamAction(infoArea?.actionParameter);
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/actions/' + event,
        {
          headers: {
            token: token,
          },
        },
      );

      const allPropertyNames = Object.keys(
        response.data,
      ) as (keyof typeof response.data)[];

      const updatedList = allPropertyNames.map(async key => {
        const data = response.data[key];
        const variableType = typeof data;

        return {
          nameParam: String(key),
          typeParam: variableType,
          param: paramAction[key],
        };
      });

      const resolvedList = await Promise.all(updatedList);

      setListParamAction(await resolvedList);
      setModelParamAction(await response.data);
    } catch (error) {
      console.error(error);
    }
    setShowListAction(false);
  };

  const handleReactionAreaChange = async (event: string) => {
    setSelectedReaction(event);
    setListParamReaction([]);
    setParamReaction(infoArea?.reactionParameter);
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/reactions/' + event,
        {
          headers: {
            token: token,
          },
        },
      );

      const allPropertyNames = Object.keys(
        response.data,
      ) as (keyof typeof response.data)[];

      const updatedList = allPropertyNames.map(async key => {
        const data = response.data[key];
        const variableType = typeof data;

        return {
          nameParam: String(key),
          typeParam: variableType,
          param: paramReaction[key],
        };
      });

      const resolvedList = await Promise.all(updatedList);

      setListParamReaction(await resolvedList);
      setModelParamReaction(await response.data);
    } catch (error) {
      console.error(error);
    }
    setShowListReaction(false);
  };

  const handleParamActionChange = (
    event: string | number | boolean,
    nameParam: string,
  ) => {
    const updatedList = listParamAction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          param: event,
        };
      }
      return param;
    });
    setListParamAction(updatedList);
  };

  const handleParamReactionChange = (
    event: string | number | boolean,
    nameParam: string,
  ) => {
    const updatedList = listParamReaction.map(param => {
      if (param.nameParam === nameParam) {
        return {
          ...param,
          param: event,
        };
      }
      return param;
    });
    setListParamReaction(updatedList);
  };

  const handleCallActionList = () => {
    setListAction([]);
    axios
      .get('http://10.0.2.2:8080/actions', {
        headers: {
          token: token,
        },
      })
      .then(response => {
        setListAction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: {name: string}) => item.name),
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCallReactionList = () => {
    setListReaction([]);
    axios
      .get('http://10.0.2.2:8080/reactions', {
        headers: {
          token: token,
        },
      })
      .then(response => {
        setListReaction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: {name: string}) => item.name),
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateArea = () => {
    for (var i = 0; i < listParamAction.length; i++) {
      if (listParamAction[i].typeParam === 'number') {
        modelParamAction[listParamAction[i].nameParam] = Number(
          listParamAction[i].param,
        );
      } else {
        modelParamAction[listParamAction[i].nameParam] =
          listParamAction[i].param;
      }
    }

    for (var y = 0; y < listParamReaction.length; y++) {
      if (listParamReaction[y].typeParam === 'number') {
        modelParamReaction[listParamReaction[y].nameParam] = Number(
          listParamReaction[y].param,
        );
      } else {
        modelParamReaction[listParamReaction[y].nameParam] =
          listParamReaction[y].param;
      }
    }

    const data = {
      nameArea: nameArea,
      nameAction: selectedAction,
      actionParameter: modelParamAction,
      nameReaction: selectedReaction,
      reactionParameter: modelParamReaction,
    };
    axios
      .put('http://10.0.2.2:8080/areas/' + props.name, data, {
        headers: {
          token: token,
        },
      })
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  const handleCallAreaInfo = async () => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/areas/' + props.name,
        {
          headers: {
            token: token,
          },
        },
      );
      await setInfoArea(await response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (infoArea === null) {
      handleCallAreaInfo();
    } else {
      setNameArea(infoArea.nameArea);
      if (listParamAction.length === 0) {
        handleActionAreaChange(infoArea.nameAction);
      }
      if (listParamReaction.length === 0) {
        handleReactionAreaChange(infoArea.nameReaction);
      }
    }
    if (listAction === undefined) {
      handleCallActionList();
    }
    if (listReaction === undefined) {
      handleCallReactionList();
    }
  }, [infoArea, listAction, listReaction]);

  return (
    <View style={styles.editComponent}>
      <View style={styles.editComponentBody}>
        <Text style={styles.editComponentTitle}>Edit Area</Text>
        <TextInput
          style={styles.editComponentNameInput}
          onChangeText={handleNameAreaChange}
          value={nameArea}
          placeholder="Area Name"
          inputMode="text"
        />
        <View>
          <TouchableOpacity
            style={styles.editComponentActionInput}
            onPress={handleClickActionList}>
            <Text style={styles.editComponentActionTitle}>
              {selectedAction}
            </Text>
            <View style={styles.editComponentActionLine} />
            <Image
              style={styles.editComponentActionButton}
              source={require('../../assets/SelectInput.png')}
            />
          </TouchableOpacity>
          {showlistAction && (
            <FlatList
              style={styles.editComponentActionListArea}
              data={listAction}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.editComponentActionList}
                  onPress={() => handleActionAreaChange(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          )}
        </View>
        {listParamAction && (
          <FlatList
            data={listParamAction}
            style={styles.editComponentParamArea}
            keyExtractor={item => item.nameParam}
            renderItem={({item}) => (
              <View key={item.nameParam}>
                {item.typeParam === 'string' && (
                  <TextInput
                    style={styles.editComponentParamInput}
                    value={item.param}
                    onChangeText={text =>
                      handleParamActionChange(text, item.nameParam)
                    }
                    placeholder={item.nameParam}
                    inputMode="text"
                  />
                )}
                {item.typeParam === 'number' && (
                  <TextInput
                    value={item.param}
                    onChangeText={text =>
                      handleParamActionChange(text, item.nameParam)
                    }
                    keyboardType="numeric"
                    placeholder={item.nameParam}
                    inputMode="numeric"
                  />
                )}
                {item.typeParam === 'boolean' && (
                  <Switch
                    value={item.param}
                    onValueChange={value =>
                      handleParamActionChange(value, item.nameParam)
                    }
                  />
                )}
              </View>
            )}
          />
        )}
        <View>
          <TouchableOpacity
            style={styles.editComponentReactionInput}
            onPress={handleClickReactionList}>
            <Text style={styles.editComponentReactionTitle}>
              {selectedReaction}
            </Text>
            <View style={styles.editComponentReactionLine} />
            <Image
              style={styles.editComponentReactionButton}
              source={require('../../assets/SelectInput.png')}
            />
          </TouchableOpacity>
          {showlistReaction && (
            <FlatList
              style={styles.editComponentReactionListArea}
              data={listReaction}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.editComponentReactionList}
                  onPress={() => handleReactionAreaChange(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          )}
        </View>
        {listParamReaction && (
          <FlatList
            data={listParamAction}
            style={styles.editComponentParamArea}
            keyExtractor={item => item.nameParam}
            renderItem={({item}) => (
              <View key={item.nameParam}>
                {item.typeParam === 'string' && (
                  <TextInput
                    style={styles.editComponentParamInput}
                    value={item.param}
                    onChangeText={text =>
                      handleParamReactionChange(text, item.nameParam)
                    }
                    placeholder={item.nameParam}
                    inputMode="text"
                  />
                )}
                {item.typeParam === 'number' && (
                  <TextInput
                    value={item.param}
                    onChangeText={text =>
                      handleParamReactionChange(text, item.nameParam)
                    }
                    keyboardType="numeric"
                    placeholder={item.nameParam}
                    inputMode="numeric"
                  />
                )}
                {item.typeParam === 'boolean' && (
                  <Switch
                    value={item.param}
                    onValueChange={value =>
                      handleParamReactionChange(value, item.nameParam)
                    }
                  />
                )}
              </View>
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.editComponentButton}
        onPress={handleUpdateArea}>
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
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    height: 500,
  },
  editComponentBody: {
    width: 325,
    height: '80%',
    backgroundColor: '#C7C4DC',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'column',
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
    flexDirection: 'row',
  },
  editComponentActionTitle: {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: -45,
  },
  editComponentActionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
  },
  editComponentActionButton: {
    marginHorizontal: 10,
  },
  editComponentActionListArea: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    width: '50%',
    borderWidth: 1,
    borderColor: '#000',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 0,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 30,
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
    flexDirection: 'row',
  },
  editComponentReactionTitle: {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: -45,
  },
  editComponentReactionLine: {
    width: 1,
    height: 62,
    backgroundColor: '#000',
  },
  editComponentReactionButton: {
    marginHorizontal: 10,
  },
  editComponentReactionListArea: {
    position: 'absolute',
    backgroundColor: 'white',
    // backgroundColor: palette.secondaryContainer,
    top: 0,
    width: '50%',
    borderWidth: 1,
    borderColor: '#000',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 0,
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 50,
  },
  editComponentReactionList: {
    marginTop: 10,
  },
  editComponentParamArea: {
    margin: 0,
    marginTop: 10,
    padding: 0,
    marginBottom: 10,
  },
  editComponentParamInput: {
    marginTop: 15,
    height: 35,
    width: 250,
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
  },
});

export default EditComponent;
