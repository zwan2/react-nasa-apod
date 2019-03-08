import React from 'react';
import styles from './ViewerTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ViewerTemplate = ({ date, viewer, spaceNavigator }) => {
    return (
        <div className={cx('viewer-template')}>
            <header>
                오늘의 우주 사진 {date}
            </header>

            <div className={cx('viewer-wrapper')}>
                {viewer}
                <div className={cx('space-navigator-wrapper')}>
                    {spaceNavigator}
                </div>
            </div>

        </div>
    )
}

export default ViewerTemplate;