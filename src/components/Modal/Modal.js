import React from "react";

import "./Modal.css";

const newApi = "https://pokeapi.co/api/v2/berry";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flavors: []
    };
  }

  componentDidMount() {
    this.populatewithId();
  }

  populatewithId() {
    console.log({
      berryId: this.props.berryId,
      apiUrl: newApi + "/" + this.props.berryId
    });
    const berryId = fetch(newApi + "/" + this.props.berryId)
      .then(response => response.json())
      .then(data => this.setState({ flavors: data.flavors }));

    return berryId;
  }
  render() {
    const flavors = this.state.flavors.map((flavor, index) => (
      <p key={"flavor" + index}>
        {flavor.flavor.name} {flavor.potency}
      </p>
    ));

    return (
      <div>
        <div
          className={"modal-wrapper"}
          style={{
            transform: this.props.show
              ? "translateY(0vh)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          <div className="modal-header">
            <h3>Modal Header</h3>
            <span className="close-modal-btn" onClick={this.props.close}>
              x
            </span>
          </div>
          <div className="modal-body">
            <p>{this.props.berryId}</p>
            <div>{flavors}</div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={this.props.close}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
