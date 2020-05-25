import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addmyevent, fetchallevents } from '../../Redux/actions/event';
import { getCurrentProfile } from '../../Redux/actions/profile';

const eventSchema = yup.object({
  description: yup.string().required(),
  game: yup.string().required(),
  // from: yup.date(),
  // to: yup.date(),
  hours: yup.string(),
  gamelink: yup.string(),
  title: yup.string().required(),
  prizepool: yup.number() /*.min(1)*/,
  teamsize: yup.number() /*.min(1)*/,
});

const Addevent = ({setModalOpen}) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <Formik
        initialValues={{
          description: '',
          game: '',
          hours: '',
          // from: 0,
          // to: 0,
          prizepool: '',
          teamsize: '',
          title: '',
          gamelink: '',
        }}
        validationSchema={eventSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          dispatch(addmyevent(values));
          // values here is an object containing form data
          setModalOpen(false)
        }}
      >
        {(formikprops) => (
          <View>
            <Input
              placeholder="game -> e.g. PUBG,COC etc..."
              onChangeText={formikprops.handleChange('game')}
              value={formikprops.values.game}
              onBlur={formikprops.handleBlur('game')}
              errorMessage={formikprops.touched.game && formikprops.errors.game}
            />
            <Input
              placeholder="title -> e.g. Your coompany or organization name"
              onChangeText={formikprops.handleChange('title')}
              value={formikprops.values.title}
              onBlur={formikprops.handleBlur('title')}
              errorMessage={formikprops.touched.title && formikprops.errors.title}
            />
            <Input
              multiline
              placeholder="Your game desciption"
              onChangeText={formikprops.handleChange('description')}
              value={formikprops.values.description}
              onBlur={formikprops.handleBlur('description')}
              errorMessage={formikprops.touched.description && formikprops.errors.description}
            />
            <Input
              placeholder="Hours -> e.g. 3,4,17"
              onChangeText={formikprops.handleChange('hours')}
              value={formikprops.values.hours}
              onBlur={formikprops.handleBlur('hours')}
              errorMessage={formikprops.touched.hours && formikprops.errors.hours}
            />
            <Input
              placeholder="prizepool -> e.g. 4000,5000"
              onChangeText={formikprops.handleChange('prizepool')}
              // Bhavesh niche ke line mai maine alag se `${}` karke value di hai kyuki ek warning aa rahi thi
              // tu isko simple bana de and dekh kya warning aa rahi hai and vo warning solve kar dena
              value={`${formikprops.values.prizepool}`}
              onBlur={formikprops.handleBlur('prizepool')}
              errorMessage={formikprops.touched.prizepool && formikprops.errors.prizepool}
            />
            <Input
              placeholder="teamsize -> e.g. 2,3,4,16"
              onChangeText={formikprops.handleChange('teamsize')}
              // Bhavesh niche ke line mai maine alag se `${}` karke value di hai kyuki ek warning aa rahi thi
              // tu isko simple bana de and dekh kya warning aa rahi hai and vo warning solve kar dena
              value={`${formikprops.values.teamsize}`}
              onBlur={formikprops.handleBlur('teamsize')}
              errorMessage={formikprops.touched.teamsize && formikprops.errors.teamsize}
            />
            <Input
              multiline
              placeholder="gamelink -> e.g. your website where player visits and get more details"
              onChangeText={formikprops.handleChange('gamelink')}
              value={formikprops.values.gamelink}
              onBlur={formikprops.handleBlur('gamelink')}
              errorMessage={formikprops.touched.gamelink && formikprops.errors.gamelink}
            />
            <Button onPress={formikprops.handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Addevent;

