export default function ButtonAddLic({onClick}) {
  return (  
    <div className='flex flex-row-reverse py-4'>
      <button type="submit"
          className='btn btn-primary 
                     btn-xs sm:btn-sm md:btn-md'
              onClick={onClick}>
      Agregar Licenciatura
      </button>
    </div>
  );
}