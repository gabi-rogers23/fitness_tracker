/**
 * The index.js file is used to re-export from our separate files, that way rather than write:
 *
 * import Feature from './components/Feature';
 *
 * we can write:
 *
 * import { Feature } from './components';
 *
 * since index.js is assumed as part of the import when you specify a folder
 * 
 * write in this file: 
export { default as Nav } from "./nav";
 */

export { default as NavBar } from "./navBar";
export { default as Home } from "./home";
export { default as LogIn } from "./logIn";
export { default as Profile } from "./profile";
export { default as Routines } from "./routines";
export { default as Register } from "./register";
export { default as Activities } from "./activities";
export { default as NewActivitiesForm } from "./newActivitiesForm";
export { default as UpdateActivity } from "./updateActivity";
export { default as UpdateRoutine } from "./updateRoutine";
