import React, { Component } from 'react'

class DashCard extends Component {

  render() {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h3>
            <strong>
              <i className={`fa fa-${this.props.icon}`} 
                 aria-hidden="true" /> {this.props.title}
            </strong>
          </h3>
        </div>
        <div className="card-body">{this.props.children}</div>
    </div>
    )
  }
}

export default DashCard



// function DashCard({ icon, title, children }) {
//   return (
//     <div className="card mt-4">
//       <div className="card-header">
//         <h3>
//           <strong>
//             <i className={`fa fa-${icon}`} aria-hidden="true" /> {title}
//           </strong>
//         </h3>
//       </div>
//       <div className="card-body">{children}</div>
//     </div>
//   );
// }

// export default DashCard;
