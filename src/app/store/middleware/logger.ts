export default () => next => action => {
    console.log('trigger', action);
    return next(action);
};
