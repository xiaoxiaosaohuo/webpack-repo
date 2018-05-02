import React from 'react'
import { Row, Col, Icon } from 'antd'
import Back from '../back'
import { Link } from 'react-router-dom'

const Header = ({
    title,
    rightButton,
    className,
    showBack,
    backUrl,
    backText,
}) => (
    <Row
        type="flex"
        justify="space-between"
        align="middle"
        className={'header ' + (className || '')}
    >
        <Col>
            <span style={{ fontSize: 18, lineHeight: '40px', fontWeight: 800 }}>
                {showBack && <Back />}
                {backUrl && (
                    <Link to={backUrl} style={{ paddingRight: 10 }}>
                        <Icon type="left" />
                        <span>{backText}</span>
                    </Link>
                )}
                {title}
            </span>
        </Col>
        <Col>{rightButton || null}</Col>
    </Row>
)

export default Header
