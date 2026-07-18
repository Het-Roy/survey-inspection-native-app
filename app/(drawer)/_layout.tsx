import {Drawer} from 'expo-router/drawer'

export default function DrawerLayout(){
  
  return (
    <Drawer>
        <Drawer.Screen name = "(tabs)" options ={{
            title : "Dashboard" ,
            drawerLabel : "Dashboard"
        }}
        />
        <Drawer.Screen name = "survey" options ={{
            title : "Survey" ,
            drawerLabel : "Survey"
        }}
        />
        <Drawer.Screen name = "camera" options ={{
            title : "Camera" ,
            drawerLabel : "Camera"
        }}
        />
        <Drawer.Screen name = "contacts" options ={{
            title : "Contacts" ,
            drawerLabel : "Contacts"
        }}
        />
        <Drawer.Screen name = "location" options ={{
            title : "Location" ,
            drawerLabel : "Location"
        }}
        />
        <Drawer.Screen name = "clipboard" options ={{
            title : "Clipboard" ,
            drawerLabel : "Clipboard"
        }}
        />
        <Drawer.Screen name = "settings" options ={{
            title : "Settings" ,
            drawerLabel : "Settings"
        }}
        />
    </Drawer>
  )
}