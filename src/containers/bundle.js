

import Loadable from '../components/asyncComponent'


const Bundle = (loader,reducerLoader)=>{
    return Loadable({
      loader: loader,
      reducerLoader:reducerLoader,
      delay:500
    })
}

export default Bundle
