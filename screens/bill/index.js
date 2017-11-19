/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// return (
//     <View style={styles.modalContent}>
//         <View style={{ flexDirection: 'row', marginBottom: 10 }}>
//             <Text style={{ fontSize: 20 }}>
//                 ชำระเงิน
//             </Text>
//             <View style={{ flex: 1 }} />
//             <Button transparent
//             style={{ paddingBottom: 20 }}
//             onPress={() => this.setState({ billModal: false, billContent: 'bill' })}>
//                 <Icon name='md-close' />
//             </Button>
//         </View>
//         <View style={{ width: '100%' }}>
//             <ScrollView style={{ height: height*.5 }}>
//
//             </ScrollView>
//         </View>
//     </View>
// )
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Button, Icon, Title, List, ListItem, Item, Input, Right, Form, Label } from 'native-base';

export default class Bill extends Component<{}> {
    render() {
      return (
        <Container style={{ backgroundColor: '#fff' }}>
            <Header style={{ backgroundColor: '#3b5998' }}>
                <Left>
                    <Button transparent>
                        <Icon name="md-arrow-round-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>ชำระเงิน</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="md-checkmark" />
                    </Button>
                </Right>
            </Header>
            <Content>
                <List>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ประเภทการชำระ</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note>เงินสด</Text>
                             <Icon name="md-arrow-dropdown" />
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ราคารวม</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                             <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ส่วนลด</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                             <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ราคาสุทธิ</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ชำระ</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                             <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon style={{ marginLeft: 0, paddingLeft: 20 }}>
                        <Body>
                            <Text>ทอน</Text>
                        </Body>
                        <Right style={{ flex: 1, flexDirection: 'row' }}>
                             <Text note></Text>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'yellow'
  },
  statusContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#FFF', fontSize: 12, padding: 2, backgroundColor: '#ebb72d', borderRadius: 5 }
});
