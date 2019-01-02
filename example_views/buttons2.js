<View style={{flex: 1, paddingTop:200, flexDirection: 'column'}}>
<Button title='BUTTON' />

<Button
raised
icon={{name: 'cached'}}
backgroundColor='red'
title='BUTTON WITH ICON' />

<Button large
rightIcon={{name: 'code'}}
title='LARGE WITH RIGHT ICON' />

<Button
large
icon={{name: 'envira', type: 'font-awesome'}}
title='LARGE WITH ICON TYPE' />

<Button
large
icon={{name: 'squirrel', type: 'octicon', buttonStyle: styles.someButtonStyle }}
title='OCTICON' />

<Button
title="LOADING BUTTON"
loading
buttonStyle={{
backgroundColor: "rgba(92, 99,216, 1)",
width: 300,
height: 45,
borderColor: "transparent",
borderWidth: 0,
borderRadius: 5
}}
/>

{/* <Button
title="LOADING BUTTON"
loading
loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
titleStyle={{ fontWeight: "700" }}
buttonStyle={{
backgroundColor: "rgba(92, 99,216, 1)",
width: 300,
height: 45,
borderColor: "transparent",
borderWidth: 0,
borderRadius: 5
}}
containerStyle={{ marginTop: 20 }}
/> */}