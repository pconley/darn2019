<View style={styles.container}>
<TouchableHighlight onPress={this._onPressButton} underlayColor="white">
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableHighlight</Text>
  </View>
</TouchableHighlight>
<TouchableOpacity onPress={this._onPressButton}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableOpacity</Text>
  </View>
</TouchableOpacity>
{/* <TouchableNativeFeedback
    onPress={this._onPressButton}
    background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
  </View>
</TouchableNativeFeedback> */}
<TouchableWithoutFeedback
    onPress={this._onPressButton}
    >
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
  </View>
</TouchableWithoutFeedback>
<TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
  <View style={styles.button}>
    <Text style={styles.buttonText}>Touchable with Long Press</Text>
  </View>
</TouchableHighlight>
</View>