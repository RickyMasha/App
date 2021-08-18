import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Str from 'expensify-common/lib/str';
import styles from '../styles/styles';
import PDFView from './PDFView';
import ImageView from './ImageView';
import Icon from './Icon';
import {Paperclip} from './Icon/Expensicons';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import compose from '../libs/compose';
import Text from './Text';

const propTypes = {
    /** URL to full-sized attachment */
    sourceURL: PropTypes.string.isRequired,

    /** File object maybe be instance of File or Object */
    file: PropTypes.shape({
        name: PropTypes.string,
    }),

    rightElement: PropTypes.element,

    ...withLocalizePropTypes,
};

const defaultProps = {
    file: {
        name: '',
    },
    rightElement: undefined,
};

const AttachmentView = (props) => {
    // Check both sourceURL and file.name since PDFs dragged into the the text field
    // will appear with a sourceURL that is a blob
    if (Str.isPDF(props.sourceURL)
        || (props.file && Str.isPDF(props.file.name || props.translate('attachmentView.unknownFilename')))) {
        return (
            <PDFView
                sourceURL={props.sourceURL}
                style={styles.imageModalPDF}
            />
        );
    }

    // For this check we use both sourceURL and file.name since temporary file sourceURL is a blob
    // both PDFs and images will appear as images when pasted into the the text field
    if (Str.isImage(props.sourceURL) || (props.file && Str.isImage(props.file.name))) {
        return (
            <ImageView url={props.sourceURL} />
        );
    }

    return (
        <View
            style={styles.defaultAttachmentView}
        >
            <View style={styles.mr2}>
                <Icon src={Paperclip} />
            </View>
            <Text style={[styles.textStrong]}>{props.file && props.file.name}</Text>
            {props.rightElement && (
                <View style={styles.ml2}>
                    {props.rightElement}
                </View>
            )}
        </View>
    );
};

AttachmentView.propTypes = propTypes;
AttachmentView.defaultProps = defaultProps;
AttachmentView.displayName = 'AttachmentView';

export default compose(
    memo,
    withLocalize,
)(AttachmentView);
