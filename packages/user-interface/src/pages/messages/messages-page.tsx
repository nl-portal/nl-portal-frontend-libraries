import * as React from 'react';
import {Heading2} from '@gemeente-denhaag/components-react';
import {Action} from '@gemeente-denhaag/action';
import {Table, TableHead, TableRow, TableHeader} from '@gemeente-denhaag/table';
import {FormattedMessage} from 'react-intl';
import styles from './messages-page.module.scss';
import {messages} from './mock';

export const MessagesPage = () => (
  <section className={styles.messages}>
    <header className={styles.messages__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.messages" />
      </Heading2>
    </header>
    <Table className={styles.messages__table}>
      <TableHead>
        <TableRow>
          <TableHeader>Onderwerp</TableHeader>
          <TableHeader className={styles.messages__tableHeader}>Datum bericht</TableHeader>
        </TableRow>
      </TableHead>
    </Table>
    {messages?.map(m => (
      <Action link={m.link} dateTime={m.dateTime}>
        {m.new ? <strong>{m.title}</strong> : m.title}
      </Action>
    ))}
  </section>
);
