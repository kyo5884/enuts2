const React = require('react')
const FontAwesome = require('react-fontawesome')
const colors = require('./colors.js')
const relTime = require('./reltime.js')

class Post extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return this.props.data.is_deleted ? null : (
      <div
        style={{
          fontSize: colors.stream.fontSize,
          color: colors.stream.text,
          borderBottom: '1px solid ' + colors.stream.separator,
          padding: 8,
          display: 'flex',
          flexDirection: 'row',
          overflowWrap: 'break-word',
        }}
      >
        <img
          style={{
            width: 48,
            height: 48,
            borderRadius: '100%',
            flexBasis: '48px',
          }}
          src={this.props.data.user.content.avatar_image.link}
        />
        <div
          style={{
            marginLeft: 8,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 2,
            }}
          >
            <div
              style={{
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  color: colors.stream.name.primary,
                }}
              >
                {this.props.data.user.username}
              </span>
              <span
                style={{
                  marginLeft: 3,
                  color: colors.stream.name.secondary,
                }}
              >
                {this.props.data.user.name}
              </span>
            </div>
            <div
              style={{
                cursor: 'pointer',
                color: colors.stream.time,
              }}
            >
              {relTime(this.props.data.created_at)}
            </div>
          </div>
          <style>
            {`
              a {
                  word-break: break-all;
                  color: ${colors.stream.link};
                  text-decoration: none;
              }

              span[itemprop="mention"] {
                  color: ${colors.stream.link};
                  cursor: pointer;
              }
            `}
          </style>
          <div
            style={{}}
            dangerouslySetInnerHTML={{ __html: this.props.data.content.html }}
          ></div>
        </div>
      </div>
    )
  }
}

module.exports = Post
