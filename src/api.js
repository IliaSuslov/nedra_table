
export const onClick = (dispatch, name) => {
    dispatch('sort/dir');
    dispatch('sort/changed', name)
}

export const onChange = (dispatch, inputName, value) => {
    const text = {};
    if (typeof (value) === 'string') {
        text[inputName] = value.toLowerCase();
        dispatch('filter/changed', text)
    } else {
        text[inputName] = value;
        dispatch('filter/changed', text)
    }

}

export const deleteFilters = (dispatch) => {
    dispatch('filter/changed', {
        brand: '',
        model: '',
        year: '',
        fuel: '',
        bodyType: '',
        price: '',
    });
}
