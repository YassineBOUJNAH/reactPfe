import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="http://ensias.um5.ac.ma/" target="_blank">
                    Ensias web site
                  </a>
                </li>
                <li>
                  <a href="http://ensias.um5.ac.ma/article/master-internet-des-objets-logiciel-et-analytique-miola" target="_blank">
                    Miola info
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; 2020, made with{" "}
                <i className="fa fa-heart heart" /> by Boujnah Talhi Tarhri Boussalem
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
