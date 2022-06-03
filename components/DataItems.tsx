import React from 'react'
import styles from '../styles/Home.module.css'
import JSONPretty from 'react-json-pretty'
import { Card } from 'antd'
import { DataType } from '../types'
import { dataTypeToLabel } from '../lib/views'
import { UserActions } from './UserActions'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { AuthorActions } from './AuthorActions'
import { useStores } from '../models'
import { BlogActions } from './BlogActions'

export const DataItems = observer(() => {
  const stores = useStores()

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        {[
          DataType.User,
          DataType.Author,
          DataType.Blog,
          // DataType.Comment,
        ].map(type => (
          <div className={styles.dataItem} key={type}>
            <Card
              title={dataTypeToLabel(type)}
              size="small"
              extra={
                <>
                  {type === DataType.User ? <UserActions /> : null}
                  {type === DataType.Author ? <AuthorActions /> : null}
                  {type === DataType.Blog ? <BlogActions /> : null}
                  {/*{type === DataType.Comment ? <CommentActions /> : null}*/}
                </>
              }
            >
              <JSONPretty
                id="json-pretty"
                data={getSnapshot(stores[type].data)}
              ></JSONPretty>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
})