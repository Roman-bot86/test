import "./customInputStyle.css"


const CustomInput = ({type, placeholder, name, onChange, value, style}) => {
    return(

        <input onChange={onChange} className="customInput" type={type} placeholder={placeholder} name={name} value={value} style={style}/>
    )

}
export default CustomInput;