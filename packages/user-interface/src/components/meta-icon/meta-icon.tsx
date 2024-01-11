import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';
import {useIntl} from 'react-intl';
import styles from './meta-icon.module.scss';

interface MetaIconProps {
  title: string;
  subtitle?: string | ReactElement;
  icon: ReactElement;
  showRightBorder?: boolean;
}

const MetaIcon: FC<MetaIconProps> = ({title, subtitle, icon, showRightBorder}) => {
  const intl = useIntl();

  return (
    <div className={styles['meta-icon']}>
      {React.cloneElement(icon, {className: styles['meta-icon__icon']})}
      <Paragraph className={styles['meta-icon__paragraph']}>{title}</Paragraph>
      <Paragraph
        className={classNames(styles['meta-icon__paragraph'], styles['meta-icon__paragraph--bold'])}
      >
        {subtitle || (
          <span aria-busy aria-disabled aria-label={intl.formatMessage({id: 'element.loading'})}>
            <Skeleton width={100} />
          </span>
        )}
      </Paragraph>
      {showRightBorder && <div className={styles['meta-icon__border']} />}
    </div>
  );
};
export {MetaIcon};
