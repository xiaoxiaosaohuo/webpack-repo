
import React from 'react'

const Loading = ()=>{
    return(
        <div className="loading">
        <div className="loading-content ">
          <p className="loading-block" style={{ width: '94%' }} />
          <p>
            <span className="loading-block" style={{ width: '28%' }} />
            <span className="loading-block" style={{ width: '62%' }} />
          </p>
          <p>
            <span className="loading-block" style={{ width: '22%' }} />
            <span className="loading-block" style={{ width: '66%' }} />
          </p>
          <p>
            <span className="loading-block" style={{ width: '56%' }} />
            <span className="loading-block" style={{ width: '39%' }} />
          </p>
          <p>
            <span className="loading-block" style={{ width: '21%' }} />
            <span className="loading-block" style={{ width: '15%' }} />
            <span className="loading-block" style={{ width: '40%' }} />
          </p>
        </div>
        </div>
    )
}
const LoadingComponent = (props) => {
        console.log(props)
    if (props.isLoading) {
        if (props.timedOut) {
         //超时
          return <div>加载超时...</div>;
        } else if (props.pastDelay) {
          //超时后显示loading
          return <Loading></Loading>;
        } else {
          //不显示loading
          return <div></div>;
        }
      } else if (props.error) {
        // 加载出错

            window.location.reload(true)
        
        return <div>加载出错！</div>;
      } else {
        return <div></div>;
      }
};

export default LoadingComponent
