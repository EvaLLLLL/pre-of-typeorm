import React from 'react'
import styles from '../styles/Home.module.css'
import JSONPretty from 'react-json-pretty'
import { Card } from 'antd'
import { DataTypeEnum } from '../types'
import { dataTypeToLabel } from '../utils/views'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useStore } from '../store'
import { BlogActions } from './BlogActions'
import { CommentActions } from './CommentActions'
import { AuthorActions } from './AuthorActions'
import { UserActions } from './UserActions'

export const DataItems = observer(() => {
  const stores = useStore()

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        {[
          DataTypeEnum.User,
          DataTypeEnum.Author,
          DataTypeEnum.Blog,
          DataTypeEnum.Comment,
        ].map(type => (
          <div className={styles.dataItem} key={type}>
            <div>totalCount: {stores[type].totalCount}</div>

            <Card
              title={dataTypeToLabel(type)}
              size="small"
              extra={
                <>
                  {type === DataTypeEnum.User ? <UserActions /> : null}
                  {type === DataTypeEnum.Author ? <AuthorActions /> : null}
                  {type === DataTypeEnum.Blog ? <BlogActions /> : null}
                  {type === DataTypeEnum.Comment ? <CommentActions /> : null}
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
