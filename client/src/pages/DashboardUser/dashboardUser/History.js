import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

import { HistoryWrapper, Table, Empty, Btn } from './History.styles';

import AddComment from './AddComment';

const History = ({
  handleClickOpen,
  handleClickClose,
  handlePayment,
  addOpinion,
  history,
  open,
  jobName,
  orderId,
  jobId
}) => {
  // console.log(typeof history[0].jobId)
  return (
    <HistoryWrapper>
      {history.length === 0
        ? <Empty>Your history of orders is empty for now.</Empty>
        : <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Job</th>
              <th>In</th>
              <th>Out</th>
              <th>Total</th>
              <th>Opinion</th>
              <th>Pay</th>
            </tr>
          </thead>

          <tbody>
            {history.map(({ _id, jobName, total, checkIn, checkOut, paid, rated, jobId }) => (
              <tr key={_id}>
                <td>{_id.substring(0, 7)} ...</td>
                <td>{jobName}</td>
                <td>{moment(checkIn).format('MMMM Do YYYY')}</td>
                <td>{moment(checkOut).format('MMMM Do YYYY')}</td>
                <td>{total} $</td>
                <td className="btn">
                  <Btn
                    onClick={() => handleClickOpen(jobName, _id, jobId)}
                    grayedOut={rated || !paid}
                    disabled={rated || !paid}
                  >{rated ? 'Rated' : 'Add'}</Btn>
                </td>
                <td className="btn">
                  <StripeCheckout
                    // by default: dollars
                    // All API requests expect amounts to be provided in a currency’s smallest unit. For example, to charge $10 USD, provide an amount value of 1000 (i.e, 1000 cents).
                    name="Comfy offers"
                    description={`To pay: ${total} $`}
                    amount={total * 100}
                    token={token => handlePayment({
                      total,
                      token,
                      orderId: _id,
                      jobId
                    })}
                    // publishable key
                    stripeKey="pk_test_EmXEG0tiESh8UILMxSIieKCf00pi77nUtH"
                  >
                    <Btn
                      grayedOut={paid}
                      disabled={paid}
                    >
                      {paid ? 'Paid' : 'Payment'}</Btn>
                  </StripeCheckout>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
      <AddComment
        handleClose={handleClickClose}
        handleAddOpinion={addOpinion}
        open={open}
        jobName={jobName}
        orderId={orderId}
        jobId={jobId}
      />
    </HistoryWrapper>
  );
};

History.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  handlePayment: PropTypes.func.isRequired,
  addOpinion: PropTypes.func.isRequired,
  history: PropTypes.array,
  open: PropTypes.bool.isRequired,
  jobName: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired
};

export default History;