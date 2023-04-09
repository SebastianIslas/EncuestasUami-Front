export default function Button({text, onClick, disabled}) {
  return (  
    <button type="submit"
        className='btn btn-primary 
                    btn-xs sm:btn-sm md:btn-md'
            onClick={onClick} disabled={disabled}>
    {text}
    </button>
  );
}