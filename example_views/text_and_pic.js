      <View style={styles.container}>
        <Text style={[styles.welcome, styles.big]}>Oh Darn!</Text>
        <Text style={[styles.instructions]}>To get started, edit App.js</Text>
        <Text style={[styles.instructions,styles.red]}>{instructions}</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Blink style={[styles.blue, styles.big]} text="banana" />
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
    </View>