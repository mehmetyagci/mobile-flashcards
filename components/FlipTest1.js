import React, {Component} from 'react';
import FlipComponent from 'react-native-flip-component';
import {View, Button, Text, TouchableOpacity} from 'react-native';

class FlipTest1 extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isFlipped: false,
    };
  }
  render () {
    return (
      <View>
        <FlipComponent
          isFlipped={this.state.isFlipped}
          frontView={
            <View>
              <Text style={{textAlign: 'center'}}>
                Front Side
              </Text>
              <Button title="ButtonFront1" />
              <Button title="ButtonFront2" />
            </View>
          }
          backView={
            <View>
              <Text style={{textAlign: 'center'}}>
                Back Side
              </Text>
              <Button title="ButtonBack1" />
              <Button title="ButtonBack2" />
            </View>
          }
        />
        <Button
          onPress={() => {
            this.setState ({isFlipped: !this.state.isFlipped});
          }}
          title="Flip"
        />
      </View>
    );
  }
}

export default FlipTest1;
