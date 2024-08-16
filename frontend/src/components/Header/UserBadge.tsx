import React from 'react';
import {useSelector} from "react-redux";
import {User} from "../../types/Todo";
import styles from "./UserBadge.module.css";
import {OverlayTrigger, Popover} from "react-bootstrap";

function UserBadge(props: any) {
    const { firstName, picture} = useSelector((state: any) => state.auth.user) as User;
    const { children } = props;
    const popover = (
        <Popover id='user-popover'>
            <Popover.Header as="h3">Hello {firstName}!</Popover.Header>
            <Popover.Body className={styles.userActions}>
                {children}
            </Popover.Body>
        </Popover>
    )
    return (

        <div className={styles.userBadge}>
            <OverlayTrigger placement="bottom" trigger="click" overlay={popover}>
                <section className={styles.profile}>
                    {
                        picture &&
                        <img src={picture} alt="profile-picture" className={styles.picture}/>
                    }
                    {
                        !picture &&
                        <div className={styles.initials}>{firstName}</div>
                    }
                </section>
            </OverlayTrigger>
        </div>
    );
}

export default UserBadge;