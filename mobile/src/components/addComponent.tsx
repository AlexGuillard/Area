import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { useAuth } from 'src/context/UserContext';

const AddComponent = () => {

  interface ParamItem {
    nameParam: string;
    typeParam: string;
    param: any;
  }

  const [nameArea, setNameArea] = useState("");
  const [selectedAction, setSelectedAction] = useState("Action");
  const [selectedReaction, setSelectedReaction] = useState("Reaction");
  const [showlistAction, setShowListAction] = useState(false);
  const [showlistReaction, setShowListReaction] = useState(false);
  const [listAction, setListAction] = useState<string []>();
  const [listReaction, setListReaction] = useState<string []>();

  const [listParamAction, setListParamAction] = useState<ParamItem []>([]);
  const [listParamReaction, setListParamReaction] = useState<ParamItem []>([]);

  const [modelParamAction, setModelParamAction] = useState<any>([])
  const [modelParamReaction, setModelParamReaction] = useState<any>([])
  const { token } = useAuth();

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

  const handleActionAreaChange = async(event: string) => {
    setListParamAction([])
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/" + token + "/actions/" + event);
        const allPropertyNames = Object.keys(response.data) as (keyof typeof response.data)[];
        const updatedList = allPropertyNames.map(async (key) => {
          const data = response.data[key];
          const variableType = typeof data;
          return {
            nameParam: String(key),
            typeParam: variableType,
            param: null
          };
        });
        const resolvedList = await Promise.all(updatedList);

        setListParamAction(await resolvedList);
        setModelParamAction(await response.data)
      } catch (error) {
        console.error(error);
      }
      setShowListAction(false)
  };

  const handleReactionAreaChange = async(event: string) => {
    setSelectedReaction(event);
    setListParamReaction([])
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/" + token + "/reactions/" + event);
        const allPropertyNames = Object.keys(response.data) as (keyof typeof response.data)[];
        const updatedList = allPropertyNames.map(async (key) => {
          const data = response.data[key];
          const variableType = typeof data;
          return {
            nameParam: String(key),
            typeParam: variableType,
            param: null
          };
        });

        const resolvedList = await Promise.all(updatedList);
        setListParamReaction(await resolvedList);
        setModelParamReaction(await response.data)
      } catch (error) {
        console.error(error);
      }
      setShowListReaction(false)
    };

    const handleParamActionChange = (event: string, nameParam: string) => {
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

    const handleParamReactionChange = (event:string, nameParam: string) => {
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
    axios.get(process.env.REACT_APP_SERVER_URL + "/" + token + "/actions")
      .then(response => {
        setListAction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { name: string }) => item.name)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleCallReactionList = () => {
    axios.get(process.env.REACT_APP_SERVER_URL + "/" + token + "/reactions")
      .then(response => {
        setListReaction((prevState: string[] | undefined) => [
          ...(prevState || []),
          ...response.data.map((item: { name: string }) => item.name)
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleCreateArea = () => {
    for (var i = 0; i < listParamAction.length; i++) {
      if (listParamAction[i].typeParam === "number") {
        modelParamAction[listParamAction[i].nameParam] = Number(listParamAction[i].param)
      } else {
        modelParamAction[listParamAction[i].nameParam] = listParamAction[i].param
      }
    }
    for (var y = 0; y < listParamReaction.length; y++) {
      if (listParamReaction[y].typeParam === "number") {
        modelParamReaction[listParamReaction[y].nameParam] = Number(listParamReaction[y].param)
      } else {
        modelParamReaction[listParamReaction[y].nameParam] = listParamReaction[y].param
      }
    }

    const data = {
      nameArea: nameArea,
      nameAction: selectedAction,
      actionParameter: modelParamAction,
      nameReaction: selectedReaction,
      reactionParameter: modelParamReaction
    }
    axios.post(process.env.REACT_APP_SERVER_URL + "/" + token + "/areas", data)
    .then(response => {
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    handleCallActionList()
    handleCallReactionList()
  }, []);


  return (
    <View style={styles.addComponent}>
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
