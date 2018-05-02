
import React from 'react'

const Loading = ()=>{
    return(
        <div className="loading">
        <div className="loading-content ">
          <p className="loading-block" style={{ width: '94%',height:200 }}></p>
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
export default Loading
