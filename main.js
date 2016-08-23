'use strict';
const electron = require('electron');
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;

let enableScans = 'true';
let tray = null;

const menuItems = {
	scanning: {
		label : 'Enable Scanning',
		type : 'radio',
		checked : true,
		click : toggleScanning
	},
	preferences : {
		label : 'Preferences',
		click : () => {console.log('Clicked preferences...');}
	},
	about : {
		label : 'About',
		click : () => { console.log('Clicked about...'); }
	},
	quit : {
		label : 'Quit',
		click : () => {triggerExit();}
	}
};

function triggerExit(){
	tray.destroy();
	app.exit(0);
}

function buildMenu(){

	const contextMenu = new Menu();

	Object.keys(menuItems).forEach(key => {
		contextMenu.append(new MenuItem(menuItems[key]));
	});

	tray.setContextMenu(contextMenu);

}


function toggleScanning(){

	if(enableScans){
		enableScans = false;
	} else {
		enableScans = true;
	}

	menuItems.scanning.checked = enableScans === true ? true : 'false';
	buildMenu();

}
app.on('ready', () => {

	tray = new Tray(`${__dirname}/icons/ft-icon-search.png`);
	tray.setHighlightMode('selection');

	buildMenu();

});

app.on('quit', () => {
	triggerExit();
})