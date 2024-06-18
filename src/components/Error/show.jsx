
const ShowError = ({errors}) => {
    if(errors.length > 0) {
        return (
            <ul>
                <li style={{color: 'red', marginLeft: '10px', marginTop: '-10px',marginBottom: '15px', fontSize: '12px', listStyle: 'none'}}>{errors}</li>
            </ul>
        )
    }
    
}

export default ShowError;