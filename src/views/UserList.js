import React, { useContext } from 'react';
import { View , FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {

  const { state, dispatch }  =  useContext(UsersContext)

  function confirUesrDeletion(user){
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress(){
          dispatch({
              type: 'deleteUser',
              payload: user,
          })
        }
      },
      {
        text: 'Não'
      }
    ])
  }
    
  function getUserItem({ item:user }){
    
    return (

      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}
        
        title={user.name}
        subtitle={user.email}
      >
        <Avatar  rounded source={{uri: user.avatarUrl}} />
          <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon  
              name='edit'  
              type='clear'  
              color='orange'
              onPress={() => props.navigation.navigate('UserForm', user)}
          />

          <Icon  
              name='delete'  
              type='clear'  
              color='red'
              onPress={() => confirUesrDeletion(user)}
          />

      </ListItem>
      
    )
  }

  return (
    <View>
      <FlatList 
          keyExtractor={user => user.id.toString()}
          data={state.users}
          renderItem={getUserItem}
      />
      
    </View>
  )
}